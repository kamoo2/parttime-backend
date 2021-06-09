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
  Store: {
    employees: ({ id }, { page }) => {
      return client.employee.findMany({
        where: {
          storeId: id,
        },
        take: 10,
        skip: page ? (page - 1) * 10 : 0,
      });
    },
    photos: ({ id }) =>
      client.storePhoto.findMany({
        where: {
          storeId: id,
        },
      }),
    total_photos: ({ id }) =>
      client.storePhoto.count({
        where: {
          storeId: id,
        },
      }),

    total_employees: ({ id }) =>
      client.employee.count({ where: { storeId: id } }),
    isMine: async ({ id }, _, { loggedInUser }) => {
      const storeBoss = await client.store
        .findUnique({
          where: {
            id,
          },
        })
        .user({
          select: {
            id: true,
          },
        });
      return storeBoss.id === loggedInUser.id;
    },
  },
};
