import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createDailySail: protectedResolver(
      async (_, { storeId, sail }, { loggedInUser }) => {
        try {
          const existStore = await client.store.findUnique({
            where: { id: storeId },
            select: { id: true, userId: true },
          });

          if (!existStore) {
            throw Error("존재하지 않는 가게 입니다.");
          }

          if (existStore.userId !== loggedInUser.id) {
            throw Error("자기 가게가 아닙니다.");
          }
          console.log(typeof sail);
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const slug = `${year}-${month}-${day}`;

          const existSail = await client.sail.findFirst({
            where: {
              storeId,
              slug,
            },
            select: {
              id: true,
            },
          });
          if (existSail) {
            await client.sail.delete({
              where: {
                id: existSail.id,
              },
            });
          }

          await client.sail.create({
            data: {
              year,
              month,
              day,
              slug,
              sail,
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
