import { gql } from "apollo-server-core";

export default gql`
  type UpdateStoreResult {
    ok: Boolean!
    error: String
    newStore: Store
  }
  type Mutation {
    updateStore(
      id: Int!
      store: String
      storeNumber: String
      files: Upload
      category: String
    ): UpdateStoreResult!
  }
`;
