import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codepipeline_actions from "aws-cdk-lib/aws-codepipeline-actions";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";
import { version } from "os";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Domain Name
    const domainName = "christopher-fiallos.com";
    const www = "www";

    // Github repo details
    const githubOwner = "Athroscf";
    const githubRepo = "portfolio2.0";
    const githubBranch = "master";

    // VPC creation
    const vpc = new ec2.Vpc(this, "PortfolioVPC", {
      maxAzs: 2,
      natGateways: 1,
    });

    // Create ECR repo to store docker image
    const repository = new ecr.Repository(this, "PortfolioRepository", {
      repositoryName: "portfolio-repo",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Fargate cluster creation
    const cluster = new ecs.Cluster(this, "PortfolioCluster", {
      vpc,
      clusterName: "portfolio-cluster",
    });

    // Task definition with Fargate compatibility
    const taskDefinition = new ecs.FargateTaskDefinition(this, "PortfolioTaskDef", {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    // Add container to task definition
    const container = taskDefinition.addContainer("PortfolioContainer", {
      image: ecs.ContainerImage.fromEcrRepository(repository),
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: "portfolio" }),
      environment: {
        NODE_ENV: "production",
      },
    });

    container.addPortMappings({
      containerPort: 3000,
    });

    // Look for hosted zone
    const zone = route53.HostedZone.fromLookup(this, "Zone", {
      domainName,
    });

    // Create certificate
    const certificate = new acm.Certificate(this, "SiteCertificate", {
      domainName,
      validation: acm.CertificateValidation.fromDns(zone),
      subjectAlternativeNames: [`${www}.${domainName}`],
    });

    // Fargate service
    const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      "PortfolioService",
      {
        cluster,
        taskDefinition,
        desiredCount: 2,
        publicLoadBalancer: true,
        assignPublicIp: true,
        listenerPort: 443,
        domainName,
        domainZone: zone,
        certificate,
      },
    );

    // Add www subdomain
    new route53.ARecord(this, "WWWARECORD", {
      zone,
      recordName: www,
      target: route53.RecordTarget.fromAlias(
        new targets.LoadBalancerTarget(fargateService.loadBalancer),
      ),
    });

    // Scale based on CPU utilization
    const scaling = fargateService.service.autoScaleTaskCount({ maxCapacity: 4 });

    scaling.scaleOnCpuUtilization("CpuScaling", {
      targetUtilizationPercent: 70,
      scaleInCooldown: cdk.Duration.seconds(60),
      scaleOutCooldown: cdk.Duration.seconds(60),
    });

    // Security group to allow inbound traffic on port 443
    fargateService.service.connections.allowFromAnyIpv4(ec2.Port.tcp(443));

    // CodeBuild project
    const buildProject = new codebuild.PipelineProject(this, "BuildProject", {
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
              "echo Pushing the Docker image...",
              "docker push $REPOSITORY_URI:$CODEBUILD_RESOLVED_SOURCE_VERSION",
              "docker push $RESPOSITORY_URI:latest",
              "echo Writing image definitions file...",
              'printf \'[{"name":"PortfolioContainer","imageUri":"%s"}]\' $REPOSITORY_URI:latest > imagedefinitions.json',
            ],
          },
        },
        artifacts: {
          files: ["imagedefinitions.json"],
        }
      }),
    });

    // Grant permissions to CodeBuild to access ECR
    repository.grantPullPush(buildProject.role!);

    // Create a CodePipeline
    const pipeline = new codepipeline.Pipeline(this, "Pipeline", {
      pipelineName: "PortfolioPipeline",
    });

    // Add source stage
    const sourceOutput = new codepipeline.Artifact();

    const sourceAction = new codepipeline_actions.GitHubSourceAction({
      actionName: "Github_Source",
      owner: githubOwner,
      repo: githubRepo,
      branch: githubBranch,
      oauthToken: cdk.SecretValue.secretsManager("github-oauth-token"),
      output: sourceOutput,
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
      actionName: "Deploy",
      service: fargateService.service,
      input: buildOutput,
    });

    pipeline.addStage({
      stageName: "Deploy",
      actions: [deployAction],
    });

    // Output the URL of the Load Balancer
    new cdk.CfnOutput(this, "LoadBalancerDNS", {
      value: fargateService.loadBalancer.loadBalancerDnsName,
      description: "The load balancer DNS name",
    });

    // Output the ECR repository URI
    new cdk.CfnOutput(this, "RepositoryURI", {
      value: repository.repositoryUri,
      description: "The URI of the ECR repository",
    });

    // Output the website URL
    new cdk.CfnOutput(this, "SiteUrl", {
      value: `https://${domainName}`,
      description: "The URL of the website",
    });
  }
}
