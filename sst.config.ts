/// <reference path="./.sst/platform/config.d.ts" />

import {preparePrismaLayerFiles} from "./layer";

export default $config({
  app(input) {
    return {
      name: "sst-ion-db",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "sa-east-1"
        }
      }
    };
  },
  async run() {
    preparePrismaLayerFiles();

    // const PrismaLayer = new lambda.LayerVersion(stack, 'PrismaLayer', {
    //   description: 'Prisma layer',
    //   code: lambda.Code.fromAsset(path.resolve(prismaLayerPath))
    // })

    const api = new sst.aws.ApiGatewayV2("MyApi");
    api.route("GET /", {
      handler: "index.handler",
      environment: {
        // You can also use the Config.DATABASE_URL object here
        // or the bind functionality instead of environment props, i.e. bind: [DATABASE_URL],
        DATABASE_URL: process.env.DATABASE_URL!,
      },
      nodejs: {
        format: 'cjs',
        esbuild: {
          sourcemap: true,
          external: ['@prisma/client', '.prisma'],
        },
      },
      // layers: ''
      // layers: [PrismaLayer]
    });
  },
});
