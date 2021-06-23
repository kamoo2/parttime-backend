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
    sails: [Sail]
    total_page(take: Int!, home: Boolean!): Int!
    total_employees: Int!
    total_photos: Int!
    total_year_sail: Int!
    total_month_sail: Int!
    today_sail: Int!
    isMine: Boolean!
    isLiked: Boolean!
    likeCount: Int!
    commentCount: Int!
  }
  type Like {
    id: Int!
    store: Store!
    createdAt: String!
    updatedAt: String!
  }
  type Sail {
    id: Int!
    year: Int!
    month: Int!
    day: Int!
    slug: String!
    sail: Int!
    store: Store!
    createdAt: String!
    updatedAt: String!
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
