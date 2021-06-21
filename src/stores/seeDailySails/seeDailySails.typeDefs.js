import { gql } from "apollo-server-express";

export default gql`
  type SeeDailySailsResult {
    ok: Boolean!
    error: String
    sails: [Sail]
  }
  type Query {
    seeDailySails(storeId: Int!, year: Int!, month: Int!): SeeDailySailsResult!
  }
`;
