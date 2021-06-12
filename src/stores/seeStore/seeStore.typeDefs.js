import { gql } from "apollo-server-core";

export default gql`
  type SeeStoreResult {
    ok: Boolean!
    error: String
    store: Store
  }
  type Query {
    seeStore(id: Int!): SeeStoreResult!
  }
`;
