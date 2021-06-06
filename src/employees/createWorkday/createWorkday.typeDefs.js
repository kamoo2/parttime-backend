import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createWorkday(
      year: Int!
      month: Int!
      day: Int!
      workTime: Int!
      employeeId: Int!
    ): CommonResult!
  }
`;
