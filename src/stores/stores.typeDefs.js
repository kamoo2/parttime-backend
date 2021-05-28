import { gql } from "apollo-server-core";

export default gql`
  type Store {
    id: Int!
    store: String!
    phone: String!
    wage: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
