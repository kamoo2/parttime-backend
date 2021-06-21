import client from "../../client";

export default {
  Query: {
    seeAllStores: (_, { page }) =>
      client.store.findMany({
        include: {
          user: true,
          photos: true,
          holidays: true,
          rules: true,
          category: true,
        },
        take: 9,
        skip: page ? (page - 1) * 9 : 0,
      }),
  },
};
