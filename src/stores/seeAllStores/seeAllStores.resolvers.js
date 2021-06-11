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
        },
        take: 10,
        skip: page ? (page - 1) * 10 : 0,
      }),
  },
};
