import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteWorkday(empId: Int!, workdayId: Int!): CommonResult!
  }
`;
