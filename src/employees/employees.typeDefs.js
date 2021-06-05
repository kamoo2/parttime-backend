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
  }

  type Workday {
    id: Int!
    year: Int!
    month: Int!
    day: Int!
    employee: Employee!
    createdAt: String!
    updatedAt: String!
  }
`;
