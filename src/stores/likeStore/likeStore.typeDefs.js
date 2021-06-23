import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    likeStore(id: Int!): CommonResult!
  }
`;
