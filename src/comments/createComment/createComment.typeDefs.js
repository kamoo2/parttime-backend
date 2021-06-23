import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createComment(storeId: Int!, comment: String!): CommonResult!
  }
`;
