import { gql } from "apollo-server-core";

export default gql`
  type seeEmployeeResult {
    ok: Boolean!
    error: String
    employee: Employee
  }
  type Query {
    seeEmployee(id: Int!): seeEmployeeResult!
  }
`;
