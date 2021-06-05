import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteStore(id: Int!): CommonResult!
  }
`;
