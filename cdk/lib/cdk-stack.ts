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

interface PortfolioStackProps extends cdk.StackProps {
  domainName: string;
  githubOwner: string;
  githubRepo: string;
}

export class PorfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PortfolioStackProps) {
    super(scope, id);

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

    // Fargate Service
    const fargateService = new ecs.FargateService(this, "PortfolioService", {
      cluster,
      taskDefinition,
      desiredCount: 1,
      assignPublicIp: true,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
    });

    // Load Balancer
    const lb = new elbv2.ApplicationLoadBalancer(this, "PortfolioLB", {
      vpc,
      internetFacing: true,
    });

    const listener = lb.addListener("PortfolioListener", { port: 80 });

    listener.addTargets("PortfolioTarget", {
      port: 3000,
      targets: [fargateService],
      healthCheck: {
        path: "/",
        healthyHttpCodes: "200",
      },
    });

    // Route53 and ACM
    const zone = route53.HostedZone.fromLookup(this, "Zone", {
      domainName: props.domainName,
    });

    const certificate = new acm.Certificate(this, "PortfolioCert", {
      domainName: props.domainName,
      validation: acm.CertificateValidation.fromDns(zone),
    });

    const httpsListener = lb.addListener("HttpListener", {
      port: 443,
      certificates: [certificate],
    });

    httpsListener.addTargets("HttpsTarget", {
      port: 3000,
      targets: [fargateService],
    });

    new route53.ARecord(this, "PortfolioAliasRecord", {
      zone,
      target: route53.RecordTarget.fromAlias(new r53t.LoadBalancerTarget(lb)),
      recordName: props.domainName,
    });

    // Github secret
    const githubSecret = sm.Secret.fromSecretNameV2(this, "GithubSecret", "github-oauth-3");

    // CodeBuild project
    const buildProject = new cb.PipelineProject(this, "PortfolioBuildProject", {
      environment: {
        buildImage: cb.LinuxBuildImage.STANDARD_7_0,
        privileged: true,
      },
      environmentVariables: {
        REPOSITORY_URI: { value: repository.repositoryUri },
      },
      buildSpec: cb.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          pre_build: {
            commands: [
              "echo Loggin in to Amazon ECR...",
              "aws ecr get-loggin-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $REPOSITORY_URI",
            ],
          },
          build: {
            commands: [
              "echo Build started on `date`",
              "echo Building the Docker image...",
              "docker build -t $REPOSITORY_URI:$CODEBUILD_RESOLVED_SOURCE_VERSION .",
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

    repository.grantPullPush(buildProject.role!);

    // CodePipeline
    const pipeline = new cp.Pipeline(this, "PortfolioPipeline", {
      pipelineName: "PortfolioPipeline",
    });

    // Source Stage
    const sourceOutput = new cp.Artifact();
    const sourceAction = new cpa.GitHubSourceAction({
      actionName: "Github_Source",
      owner: props.githubOwner,
      repo: props.githubRepo,
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

    // Output
    new cdk.CfnOutput(this, "LoadBalancerDNS", { value: lb.loadBalancerDnsName });
  }
}

export default function Component(props: { initialTime?: number } = { initialTime: 0 }) {
  return null;
}
