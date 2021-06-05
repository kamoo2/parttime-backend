import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeAllStores(page: Int): [Store]
  }
`;
