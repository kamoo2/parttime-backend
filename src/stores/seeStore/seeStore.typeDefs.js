import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeStore(id: Int!): Store!
  }
`;
