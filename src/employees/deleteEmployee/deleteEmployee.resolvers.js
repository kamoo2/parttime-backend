import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteEmployee: protectedResolver(
      async (_, { storeId, id }, { loggedInUser }) => {
        // 직원의 가게의 user가 loggedInUser와 같은 경우에만 성립 해야함
        try {
          const boss = await client.store.findUnique({
            where: {
              id: storeId,
            },
            select: {
              userId: true,
            },
          });
          if (boss.userId !== loggedInUser.id) {
            throw new Error("당신의 가게가 아닙니다.");
          }
          const existEmp = await client.employee.findFirst({
            where: {
              storeId,
              id,
            },
            select: {
              id: true,
            },
          });
          if (!existEmp) {
            throw new Error("해당하는 직원이 존재하지 않습니다.");
          }

          await client.employee.delete({
            where: {
              id,
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
