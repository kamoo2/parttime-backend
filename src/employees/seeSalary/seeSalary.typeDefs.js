import { gql } from "apollo-server-express";

export default gql`
  type SeeSalaryResult {
    salary: Int!
    workdayOfMonth: Int!
  }
  type Query {
    seeSalary(employeeId: Int!, year: Int, month: Int!): SeeSalaryResult!
  }
`;
