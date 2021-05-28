import { gql } from "apollo-server-core";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      username: String
      name: String
      email: String
      phoneNumber: String
      password: String
      location: String
      avatarURL: Upload
    ): EditProfileResult!
  }
`;
