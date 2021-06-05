import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createStore: protectedResolver(
      async (_, { store, storeNumber, category, file }, { loggedInUser }) => {
        try {
          const uniqueCheck = await client.store.findUnique({
            where: {
              storeNumber,
            },
          });
          if (uniqueCheck) {
            throw Error("이미 존재하는 storeNumber입니다.");
          }
          await client.store.create({
            data: {
              store,
              storeNumber,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              category: {
                connectOrCreate: {
                  where: {
                    name: category,
                  },
                  create: {
                    name: category,
                  },
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
