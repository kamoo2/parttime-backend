import { gql } from "apollo-server-core";

export default gql`
  type Store {
    id: Int!
    store: String!
    storeNumber: String!
    user: User!
    createdAt: String!
    updatedAt: String!
    employees(page: Int): [Employee]
    category: Category!
    photos: [StorePhoto]
    holidays: [Holiday]
    rules: [Rule]
    total_page: Int!
    total_employees: Int!
    total_photos: Int!
    isMine: Boolean!
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

  type Holiday {
    id: Int!
    name: String!
    stores: [Store]
    createdAt: String!
    updatedAt: String!
  }
  type Rule {
    id: Int!
    name: String!
    stores: [Store]
    createdAt: String!
    updatedAt: String!
  }
`;
