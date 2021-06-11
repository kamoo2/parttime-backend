import { gql } from "apollo-server-core";

export default gql`
  type Employee {
    id: Int!
    name: String!
    age: Int!
    wage: Int!
    store: Store!
    phoneNumber: String!
    avatarURL: String
    createdAt: String!
    updatedAt: String!
    workdays: [Workday]
    salary: String!
  }

  type Workday {
    id: Int!
    year: Int!
    month: Int!
    day: Int!
    employees: [Employee]
    workTime: WorkTime!
    createdAt: String!
    updatedAt: String!
  }

  type WorkTime {
    id: Int!
    time: Int!
    workdays: [Workday]
    createdAt: String!
    updatedAt: String!
  }

  type Holiday {
    id: Int!
    holiday: String!
    stores: [Store]
    createAt: String!
    updatedAt: String!
  }

  type Rule {
    id: Int!
    rule: String!
    stores: [Store]
  }
`;
