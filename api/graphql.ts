import { ApolloServer } from "@apollo/server";
import { IResolvers } from "@graphql-tools/utils";
import cors from "cors";
import express from "express";
import requestIp from "request-ip";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "../src/schema/typedef";
import { checkAuth } from "../src/utils/auth";

const resolvers: IResolvers = {};

interface ServerContext {
  req?: any;
  clientIp?: string;
  membeR?: any;
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer<ServerContext>({
  schema,
});

const app = express();

const startServer = async (server: any) => {
  await server.start();
  app.use(
    "/graphql",
    // @ts-ignore
    cors({
      origin: "*",
      credentials: true,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
    express.json(),
    // @ts-ignore
    expressMiddleware(apolloServer, {
      // @ts-ignore
      context: ({ req }: any) => {
        const clientIp = requestIp.getClientIp(req);
        console.log(clientIp);
        const member = checkAuth(req);
        return { req, clientIp, member };
      },
    }),
  );
};

startServer(apolloServer);

export { apolloServer };

export default app;
