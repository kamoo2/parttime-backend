import { gql } from "apollo-server-core";

export default gql`
  type SeeProfileResult {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    seeProfile(id: Int!): SeeProfileResult!
  }
`;
