import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    name: String!
    username: String!
    email: String!
    password: String!
    phoneNumber: String!
    location: String
    avatarURL: String
    createdAt: String!
    updatedAt: String!
  }
`;
