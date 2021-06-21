import { gql } from "apollo-server-express";

export default gql`
  type Query {
    myStores(page: Int): [Store]
  }
`;
