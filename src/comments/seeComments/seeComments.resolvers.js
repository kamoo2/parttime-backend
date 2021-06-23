import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeComments: protectedResolver(async (_, { storeId }, { loggedInUser }) => {
      const ok = await client.store.findUnique({
        where: {
          id: storeId,
        },
        select: {
          id: true,
        },
      });

      if (!ok) {
        return null;
      }

      const comments = await client.comment.findMany({
        where: {
          storeId,
        },
        include: {
          user: true,
        },
      });
      return comments;
    }),
  },
};
