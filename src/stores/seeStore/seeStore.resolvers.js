import client from "../../client";

export default {
  Query: {
    seeStore: (_, { id }) =>
      client.store.findUnique({
        where: {
          id,
        },
        include: {
          user: true,
          photos: true,
          employees: true,
          rules: true,
          holidays: true,
        },
      }),
  },
};
