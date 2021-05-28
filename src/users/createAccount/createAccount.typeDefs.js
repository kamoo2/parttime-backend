import { gql } from "apollo-server-core";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      password: String!
      phoneNumber: String!
      location: String
      avatarURL: String
    ): CreateAccountResult!
  }
`;
