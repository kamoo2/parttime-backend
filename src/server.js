import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import logger from "morgan";
import { resolvers, typeDefs } from "./schema";
import { getUser } from "./users/users.utils";
import cors from "cors";
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers["jwt-token"]),
    };
  },
});

const PORT = process.env.PORT;

const app = express();
app.use(logger("tiny"));
app.use(cors());
apollo.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(
    `서버가 구동되고 있는 상태입니다. http://localhost:${PORT}/graphql`
  );
});
