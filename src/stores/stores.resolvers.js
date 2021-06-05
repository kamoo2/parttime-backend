import client from "../client";

export default {
  Category: {
    total_stores: (root) =>
      client.store.count({
        where: {
          categoryId: root.id,
        },
      }),
    stores: ({ id }, { page }) =>
      client.store.findMany({
        where: {
          categoryId: id,
        },
        take: 10,
        skip: page ? (page - 1) * 10 : 0,
      }),
  },
};
