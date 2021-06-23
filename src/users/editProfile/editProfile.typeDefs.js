import { gql } from "apollo-server-core";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
    id: Int
    avatarURL: String
  }
  type Mutation {
    editProfile(
      username: String
      name: String
      email: String
      phoneNumber: String
      password: String
      location: String
      file: Upload
    ): EditProfileResult!
  }
`;
