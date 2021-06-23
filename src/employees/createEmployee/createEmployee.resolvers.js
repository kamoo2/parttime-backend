import client from "../../client";
import { uploadAvatar } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createEmployee: protectedResolver(
      async (
        _,
        { name, age, wage, phoneNumber, sex, storeId, file },
        { loggedInUser }
      ) => {
        try {
          let avatarURL = null;
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

          if (phoneNumber) {
            const exist = await client.employee.findUnique({
              where: {
                phoneNumber,
              },
            });
            if (exist) {
              throw new Error("중복되는 전화번호입니다.");
            }
          }

          const shop = await client.store.findUnique({
            where: {
              id: storeId,
            },
            select: {
              store: true,
              id: true,
            },
          });

          if (file) {
            avatarURL = await uploadAvatar(
              file,
              loggedInUser.id,
              `EmployeeAvatar/${shop.id}-${shop.store}`
            );
          }

          await client.employee.create({
            data: {
              name,
              age,
              wage,
              sex,
              phoneNumber,
              ...(avatarURL && { avatarURL }),
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
