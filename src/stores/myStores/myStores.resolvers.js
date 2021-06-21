import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    myStores: protectedResolver(async (_, { page }, { loggedInUser }) =>
      client.store.findMany({
        where: {
          userId: loggedInUser.id,
        },
        include: {
          user: true,
        },
        take: 3,
        skip: page ? (page - 1) * 3 : 0,
      })
    ),
  },
};
