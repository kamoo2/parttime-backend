import client from "../../client";

export default {
  Query: {
    seeCategories: (_, { page }) =>
      client.category.findMany({
        where: {
          name: {
            startsWith: "",
          },
        },
        take: 10,
        skip: page ? (page - 1) * 10 : 0,
      }),
  },
};
