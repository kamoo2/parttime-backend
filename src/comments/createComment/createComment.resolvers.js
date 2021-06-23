import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { storeId, comment }, { loggedInUser }) => {
        try {
          const ok = await client.store.findUnique({
            where: { id: storeId },
            select: { id: true },
          });

          if (!ok) {
            throw Error("존재하지 않는 가게 입니다.");
          }

          await client.comment.create({
            data: {
              comment,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              store: {
                connect: {
                  id: storeId,
                },
              },
            },
          });
          return {
            ok: true,
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
