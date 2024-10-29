import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codepipeline_actions from "aws-cdk-lib/aws-codepipeline-actions";
import { Construct } from "constructs";

export class PorfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Domain Name
    const domainName = "christopher-fiallos.com";

    // Github repo details
    const githubOwner = "Athroscf";
    const githubRepo = "portfolio-2.0";

    // Create a VPC with minimal AZs to reduce NAT Gateway costs
    const vpc = new ec2.Vpc(this, "PortfolioVPC", {
      maxAzs: 2,
      natGateways: 1,
    });

    // Create an ECR repository
    const repository = new ecr.Repository(this, "PortfolioRepo", {
      repositoryName: "portfolio-repo",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      lifecycleRules: [
        {
          maxImageCount: 3,
          description: "Only keep 3 images to reduce storage costs",
        },
      ],
    });

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, "PortfolioCluster", { vpc });

    // Create a Fargate task definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, "PortfolioTaskDef", {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    // Add container to task definition
    const container = taskDefinition.addContainer("PortfolioContainer", {
      image: ecs.ContainerImage.fromEcrRepository(repository, "latest"),
      portMappings: [{ containerPort: 3000 }],
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: "PortfolioContainer" }),
      healthCheck: {
        command: ["CMD-SHELL", "curl -f http://localhost:3000/ || exit 1"],
        interval: cdk.Duration.seconds(30),
        timeout: cdk.Duration.seconds(5),
        retries: 3,
        startPeriod: cdk.Duration.seconds(60),
      },
    });

    // Create a Fargate service
    const service = new ecs.FargateService(this, "PortfolioService", {
      cluster,
      taskDefinition,
      desiredCount: 1, // Start with 1 instance to reduce costs
      assignPublicIp: false, // Use private subnets for better security
    });

    // Create an Application Load Balancer
    const lb = new elbv2.ApplicationLoadBalancer(this, "PortfolioLB", {
      vpc,
      internetFacing: true,
    });

    // Create a hosted zone for the domain
    const zone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName,
    });

    // Create a certificate for HTTPS
    const certificate = new acm.DnsValidatedCertificate(this, "PortfolioCertificate", {
      domainName,
      hostedZone: zone,
      region: "us-east-1", // Certificates for CloudFront must be in us-east-1
    });

    // Add HTTPS listener to the load balancer
    const httpsListener = lb.addListener("HttpsListener", {
      port: 443,
      certificates: [certificate],
    });

    /// Add the Fargate service as a target for the load balancer
    httpsListener.addTargets("PortfolioTarget", {
      port: 80,
      targets: [service],
      healthCheck: {
        path: "/",
        interval: cdk.Duration.seconds(60),
        timeout: cdk.Duration.seconds(5),
      },
    });

    // Redirect HTTP to HTTPS
    lb.addListener("HttpListener", {
      port: 80,
      defaultAction: elbv2.ListenerAction.redirect({
        port: "443",
        protocol: elbv2.ApplicationProtocol.HTTPS,
      }),
    });

    // Create Route 53 alias record for the load balancer
    new route53.ARecord(this, "PortfolioAliasRecord", {
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(new targets.LoadBalancerTarget(lb)),
      zone,
    });

    // Create a CodeBuild project
    const buildProject = new codebuild.PipelineProject(this, "PortfolioBuild", {
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
        privileged: true,
      },
      environmentVariables: {
        REPOSITORY_URI: { value: repository.repositoryUri },
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          pre_build: {
            commands: [
              "echo Logging in to Amazon ECR...",
              "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $REPOSITORY_URI",
              "COMMIT_HASH=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)",
              "IMAGE_TAG=${COMMIT_HASH:=latest}",
            ],
          },
          build: {
            commands: [
              "echo Build started on `date`",
              "echo Building the Docker image...",
              "docker build -t $REPOSITORY_URI:latest .",
              "docker tag $REPOSITORY_URI:latest $REPOSITORY_URI:$IMAGE_TAG",
            ],
          },
          post_build: {
            commands: [
              "echo Build completed on `date`",
              "echo Pushing the Docker image...",
              "docker push $REPOSITORY_URI:latest",
              "docker push $REPOSITORY_URI:$IMAGE_TAG",
              "echo Writing image definitions file...",
              'printf \'[{"name":"PortfolioContainer","imageUri":"%s"}]\' $REPOSITORY_URI:$IMAGE_TAG > imagedefinitions.json',
            ],
          },
        },
        artifacts: {
          files: ["imagedefinitions.json"],
        },
      }),
    });

    // Grant CodeBuild project permission to push to ECR
    repository.grantPullPush(buildProject.grantPrincipal);

    // Create a CodePipeline
    const pipeline = new codepipeline.Pipeline(this, "PortfolioPipeline", {
      pipelineName: "portfolio-pipeline",
    });

    // Add source stage
    const sourceOutput = new codepipeline.Artifact();
    const sourceAction = new codepipeline_actions.GitHubSourceAction({
      actionName: "Github_Source",
      owner: githubOwner,
      repo: githubRepo,
      oauthToken: cdk.SecretValue.secretsManager("github-oauth-token"),
      output: sourceOutput,
      branch: "master",
    });

    pipeline.addStage({
      stageName: "Source",
      actions: [sourceAction],
    });

    // Add build stage
    const buildOutput = new codepipeline.Artifact();
    const buildAction = new codepipeline_actions.CodeBuildAction({
      actionName: "CodeBuild",
      project: buildProject,
      input: sourceOutput,
      outputs: [buildOutput],
    });

    pipeline.addStage({
      stageName: "Build",
      actions: [buildAction],
    });

    // Add deploy stage
    const deployAction = new codepipeline_actions.EcsDeployAction({
      actionName: "DeployToECS",
      service,
      imageFile: buildOutput.atPath("imagedefinitions.json"),
    });

    pipeline.addStage({
      stageName: "Deploy",
      actions: [deployAction],
    });

    // Output the load balancer DNS name
    new cdk.CfnOutput(this, "LoadBalancerDNS", {
      value: lb.loadBalancerDnsName,
    });
  }
}
