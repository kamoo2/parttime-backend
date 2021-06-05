import client from "../client";

export default {
  User: {
    total_stores: ({ id }) =>
      client.store.count({
        where: {
          userId: id,
        },
      }),
  },
};
