import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeDailySails: protectedResolver(
      async (_, { storeId, year, month }, { loggedInUser }) => {
        try {
          const isStoreExist = await client.store.findUnique({
            where: {
              id: storeId,
            },
            select: {
              id: true,
              userId: true,
            },
          });
          if (!isStoreExist) {
            throw Error("가게가 존재하지 않습니다.");
          }

          if (isStoreExist.userId !== loggedInUser.id) {
            throw Error("자기 가게가 아닙니다.");
          }

          const sails = await client.sail.findMany({
            where: {
              storeId,
              year,
              month,
            },
            orderBy: {
              day: "asc",
            },
          });
          return {
            ok: true,
            sails,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.toString().slice(7),
          };
        }
      }
    ),
  },
};
