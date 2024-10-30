#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { PorfolioStack } from "../lib/cdk-stack";

const app = new cdk.App();
new PorfolioStack(app, "PortfolioStack", {
  domainName: "christopher-fiallos.com",
  githubOwner: "Athroscf",
  githubRepo: "portfolio-2.0",
});
