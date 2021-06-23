import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    likeStore: protectedResolver(async (_, { id }, { loggedInUser }) => {
      // check 1 : 내가 내꺼를 좋아요 가능 하냐 ? 가능하다
      // check 2 : store가 존재하냐 ?
      try {
        const store = await client.store.findUnique({
          where: { id },
          select: {
            id: true,
          },
        });

        if (!store) {
          throw Error("해당 가게가 존재하지 않습니다.");
        }

        const like = await client.like.findUnique({
          where: {
            storeId_userId: {
              userId: loggedInUser.id,
              storeId: id,
            },
          },
        });

        if (like) {
          await client.like.delete({
            where: {
              storeId_userId: {
                storeId: id,
                userId: loggedInUser.id,
              },
            },
          });
        } else {
          await client.like.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              store: {
                connect: {
                  id,
                },
              },
            },
          });
        }
        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.toString().slice(7),
        };
      }
    }),
  },
};
