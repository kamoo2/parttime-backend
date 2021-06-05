import client from "../../client";

export default {
  Query: {
    seeAllStores: (_, { page }) =>
      client.store.findMany({
        where: {
          store: {
            startsWith: "",
          },
        },
        include: {
          user: true,
        },
        take: 10,
        skip: page ? (page - 1) * 10 : 0,
      }),
  },
};
