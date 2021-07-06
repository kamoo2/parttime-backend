import { gql } from "apollo-server-core";

export default gql`
  type Employee {
    id: Int!
    name: String!
    sex: String!
    age: Int!
    wage: Int!
    store: Store!
    phoneNumber: String!
    avatarURL: String
    createdAt: String!
    updatedAt: String!
    workdays: [Workday]
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
`;
