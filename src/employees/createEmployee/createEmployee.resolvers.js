import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createEmployee: protectedResolver(
      async (
        _,
        { name, age, wage, phoneNumber, storeId, avatarURL },
        { loggedInUser }
      ) => {
        try {
          const store = await client.store.findUnique({
            where: {
              id: storeId,
            },
          });
          if (!store) {
            throw new Error("해당하는 Store가 존재하지 않습니다.");
          } else if (store.userId !== loggedInUser.id) {
            throw new Error("해당 Store의 사장님이 아닙니다.");
          }

          const existingUser = await client.employee.findFirst({
            where: {
              OR: [
                {
                  phoneNumber,
                  ...(avatarURL && { avatarURL }),
                },
              ],
            },
          });

          if (existingUser) {
            throw new Error("DB에 중복된 필드가 존재합니다.");
          }

          await client.employee.create({
            data: {
              name,
              age,
              wage,
              phoneNumber,
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
