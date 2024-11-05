import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cb from "aws-cdk-lib/aws-codebuild";
import * as cp from "aws-cdk-lib/aws-codepipeline";
import * as cpa from "aws-cdk-lib/aws-codepipeline-actions";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as iam from "aws-cdk-lib/aws-iam";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as r53t from "aws-cdk-lib/aws-route53-targets";
import * as sm from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

export class PorfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domainName = "christopher-fiallos.com";
    const githubOwner = "Athroscf";
    const githubRepo = "portfolio-2.0";

    // VPC
    const vpc = new ec2.Vpc(this, "PortfolioVpc", {
      maxAzs: 2,
      natGateways: 1,
    });

    // ECS Cluster
    const cluster = new ecs.Cluster(this, "PortfolioCluster", { vpc });

    // ECR Repository
    const repository = new ecr.Repository(this, "PortfolioRepository", {
      repositoryName: "portfolio-repo",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Task definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, "PortfolioTaskDef", {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    const container = taskDefinition.addContainer("PortfolioContainer", {
      image: ecs.ContainerImage.fromEcrRepository(repository),
      portMappings: [{ containerPort: 3000 }],
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: "portfolio" }),
    });

    // Load Balancer
    const lb = new elbv2.ApplicationLoadBalancer(this, "PortfolioLB", {
      vpc,
      internetFacing: true,
    });

    const listener = lb.addListener("PortfolioListener", { port: 80 });

    // Route53 and ACM
    const zone = route53.HostedZone.fromLookup(this, "Zone", {
      domainName,
      privateZone: false,
    });

    const certificate = new acm.Certificate(this, "PortfolioCert", {
      domainName,
      validation: acm.CertificateValidation.fromDns(zone),
    });

    const httpsListener = lb.addListener("HttpListener", {
      port: 443,
      certificates: [certificate],
    });

    // Github secret
    const githubSecret = sm.Secret.fromSecretNameV2(this, "GithubSecret", "github-oauth-token-3");

    // Resend secret
    const resendSecret = sm.Secret.fromSecretNameV2(this, "ResendApiKeySecret", "resend-api-key");

    // CodeBuild project
    const buildProject = new cb.PipelineProject(this, "PortfolioBuildProject", {
      environment: {
        buildImage: cb.LinuxBuildImage.STANDARD_7_0,
        privileged: true,
      },
      environmentVariables: {
        REPOSITORY_URI: { value: repository.repositoryUri },
        AWS_DEFAULT_REGION: { value: this.region },
        AWS_ACCOUNT_ID: { value: this.account },
        RESEND_API_KEY: {
          type: cb.BuildEnvironmentVariableType.SECRETS_MANAGER,
          value: resendSecret.secretArn,
        },
      },
      buildSpec: cb.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          install: {
            "runtime-versions": {
              nodejs: "18",
            },
            commands: [
              "apt-get update",
              "apt-get install -y jq",
              "npm install -g npm@latest",
              "n stable",
              "hash -r",
              "npm install -g yarn",
            ],
          },
          pre_build: {
            commands: [
              // Login to Amazon ECR
              "echo Login in to Amazon ECR...",
              "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com",
              //Pull base image before building to avoid rate limits
              "docker pull node:18-alpine",
            ],
          },
          build: {
            commands: [
              "echo Build started on `date`",
              "echo Building the Docker image...",
              "docker build --build-arg RESEND_API_KEY=$RESEND_API_KEY -t $REPOSITORY_URI:$CODEBUILD_RESOLVED_SOURCE_VERSION .",
              "docker tag $REPOSITORY_URI:$CODEBUILD_RESOLVED_SOURCE_VERSION $REPOSITORY_URI:latest",
            ],
          },
          post_build: {
            commands: [
              "echo Build completed on `date`",
              "echo Pushing Docker image...",
              "docker push $REPOSITORY_URI:$CODEBUILD_RESOLVED_SOURCE_VERSION",
              "docker push $REPOSITORY_URI:latest",
              "echo Writing image definitions file...",
              'printf \'[{"name":"PortfolioContainer","imageUri":"%s"}]\' $REPOSITORY_URI:latest > imagedefinitions.json',
            ],
          },
        },
        artifacts: {
          files: ["imagedefinitions.json"],
        },
      }),
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    repository.grantPullPush(buildProject.role!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    repository.grantRead(buildProject.role!);

    // Permissions
    buildProject.addToRolePolicy(
      new iam.PolicyStatement({
        actions: [
          "ecs:DescribeCluster",
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:GetDownloadForLayer",
        ],
        resources: ["*"],
      }),
    );

    // CodePipeline
    const pipeline = new cp.Pipeline(this, "PortfolioPipeline", {
      pipelineName: "PortfolioPipeline",
    });

    // Source Stage
    const sourceOutput = new cp.Artifact();
    const sourceAction = new cpa.GitHubSourceAction({
      actionName: "Github_Source",
      owner: githubOwner,
      repo: githubRepo,
      oauthToken: githubSecret.secretValue,
      output: sourceOutput,
      branch: "master",
      trigger: cpa.GitHubTrigger.WEBHOOK,
    });

    pipeline.addStage({
      stageName: "Source",
      actions: [sourceAction],
    });

    // Build Stage
    const buildOutput = new cp.Artifact();
    const buildAction = new cpa.CodeBuildAction({
      actionName: "CodeBuild",
      project: buildProject,
      input: sourceOutput,
      outputs: [buildOutput],
    });

    pipeline.addStage({
      stageName: "Build",
      actions: [buildAction],
    });

    // Fargate Service
    const fargateService = new ecs.FargateService(this, "PortfolioService", {
      cluster,
      taskDefinition,
      desiredCount: 1,
      assignPublicIp: true,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
    });

    listener.addTargets("PortfolioTarget", {
      port: 3000,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [fargateService],
      healthCheck: {
        path: "/",
        healthyHttpCodes: "200",
      },
    });

    httpsListener.addTargets("HttpsTarget", {
      port: 3000,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [fargateService],
    });

    // Deploy Stage
    const deployAction = new cpa.EcsDeployAction({
      actionName: "Deploy",
      service: fargateService,
      input: buildOutput,
    });

    pipeline.addStage({
      stageName: "Deploy",
      actions: [deployAction],
    });

    // Route53 Alias Record
    new route53.ARecord(this, "PortfolioAliasRecord", {
      zone,
      target: route53.RecordTarget.fromAlias(new r53t.LoadBalancerTarget(lb)),
      recordName: domainName,
    });

    // Grant permissions to ECS
    const ecsTaskRole = new iam.Role(this, "EcsTaskRole", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
    });

    ecsTaskRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AmazonECSTaskExecutionRolePolicy"),
    );

    repository.grantPull(ecsTaskRole);

    // Output
    new cdk.CfnOutput(this, "LoadBalancerDNS", { value: lb.loadBalancerDnsName });
  }
}

export default function Component(props: { initialTime?: number } = { initialTime: 0 }) {
  return null;
}
