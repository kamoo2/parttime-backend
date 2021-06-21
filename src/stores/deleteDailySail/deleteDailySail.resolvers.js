import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteDailySail: protectedResolver(
      async (_, { sailId }, { loggedInUser }) => {
        try {
          const isExistSail = await client.sail
            .findUnique({
              where: { id: sailId },
              select: {
                id: true,
              },
            })
            .store()
            .user({ select: { id: true } });

          if (!isExistSail) {
            throw Error("존재하지 않는 Sail입니다.");
          }
          if (isExistSail.id !== loggedInUser.id) {
            throw Error("자기 가게가 아닙니다.");
          }
          await client.sail.delete({ where: { id: sailId } });
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
