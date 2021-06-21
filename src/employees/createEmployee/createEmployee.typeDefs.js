import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createEmployee(
      name: String!
      age: Int!
      wage: Int!
      sex: String!
      phoneNumber: String!
      storeId: Int!
      file: Upload
    ): CommonResult!
  }
`;
