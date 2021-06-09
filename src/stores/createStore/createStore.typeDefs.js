import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createStore(
      store: String!
      storeNumber: String!
      category: String!
      files: Upload!
    ): CommonResult!
  }
`;
