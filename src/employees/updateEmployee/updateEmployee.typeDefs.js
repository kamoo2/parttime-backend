import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    updateEmployee(
      id: Int!
      name: String
      age: Int
      wage: Int
      sex: String
      phoneNumber: String
      file: Upload
    ): CommonResult!
  }
`;
