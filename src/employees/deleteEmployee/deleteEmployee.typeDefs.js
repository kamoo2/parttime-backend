import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteEmployee(storeId: Int!, id: Int!): CommonResult!
  }
`;
