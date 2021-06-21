import { gql } from "apollo-server-express";

export default gql`
  type CreateDailySailResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createDailySail(storeId: Int!, sail: Int!): CreateDailySailResult!
  }
`;
