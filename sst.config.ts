import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { Tags } from "aws-cdk-lib/core";
import { type SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "aws-hub",
      region: "us-east-1",
    };
  },
  stacks(app) {
    Tags.of(app).add(app.name, `${app.stage}-${app.region}`);

    app.stack(function Site({ stack }) {
      const hostedZone = HostedZone.fromLookup(stack, "HostedZone", {
        domainName: "illizen.com",
      });

      const certificate = new Certificate(stack, "Certificate", {
        domainName: `${app.name}.illizen.com`,
      });

      // TODO: Should switch to storing in aws Secrets but haven't spent the time figuring out how to get it back out for primsa. See: https://docs.sst.dev/config#overview
      const DATABASE_URL = process.env.DATABASE_URL;
      if (!DATABASE_URL) {
        throw new Error(
          "unable to find database url, it needs to be defined in a .env file or provided by your CI as DATABASE_URL...example is provided in .env.example",
        );
      }

      const site = new NextjsSite(stack, "site", {
        customDomain: {
          domainName: `${app.name}.illizen.com`,
          domainAlias: `www.${app.name}.illizen.com`,
          cdk: {
            hostedZone,
            certificate,
          },
        },
        environment: {
          DATABASE_URL,
        },
      });

      stack.addOutputs({
        SiteUrl: site.customDomainUrl || site.url,
      });
    });
  },
} satisfies SSTConfig;
