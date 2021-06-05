import client from "../../client";

export default {
  Query: {
    seeCategory: (_, { name }) =>
      client.category.findUnique({
        where: {
          name,
        },
        include: {
          stores: true,
        },
      }),
  },
};
