import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createStore(store: String!, phone: String!, wage: Int!): Store
  }
`;
