import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeEmployees(storeId: Int!): [Employee]
  }
`;
