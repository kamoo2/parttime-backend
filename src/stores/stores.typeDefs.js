import { gql } from "apollo-server-core";

export default gql`
  type Store {
    id: Int!
    store: String!
    storeNumber: String!
    user: User!
    createdAt: String!
    updatedAt: String!
    employees: [Employee]
    category: Category!
    photos: [StorePhoto]
    total_employees: Int!
  }
  type Category {
    id: Int!
    name: String!
    createdAt: String!
    updatedAt: String!
    stores(page: Int): [Store]
    total_stores: Int!
  }

  type StorePhoto {
    id: Int!
    photoURL: String!
    store: Store!
    createdAt: String!
    updatedAt: String!
  }
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
