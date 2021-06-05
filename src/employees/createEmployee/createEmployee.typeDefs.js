import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createEmployee(
      name: String!
      age: Int!
      wage: Int!
      phoneNumber: String!
      storeId: Int!
      avatarURL: Upload
    ): CommonResult!
  }
`;
