import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { ZeroWorkdaysDelete } from "../employees.utils";

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
          if (!boss) {
            throw new Error("해당하는 가게가 존재하지 않습니다.");
          }

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

          // 직원삭제 시 Workday에 연결된 직원이 없는 Workday 삭제하는 함수
          ZeroWorkdaysDelete();

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
