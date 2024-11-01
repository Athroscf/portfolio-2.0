#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { PorfolioStack } from "../lib/cdk-stack";

const app = new cdk.App();
new PorfolioStack(app, "PortfolioStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
