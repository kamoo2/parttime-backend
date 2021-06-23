import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    id: Int!
    comment: String!
    user: User!
    store: Store!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
