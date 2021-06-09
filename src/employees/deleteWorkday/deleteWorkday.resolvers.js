import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { ZeroWorkdaysDelete } from "../employees.utils";

export default {
  Mutation: {
    deleteWorkday: protectedResolver(
      async (_, { empId, workdayId }, { loggedInUser }) => {
        // 조건 1. 직원이 존재하는지
        try {
          const ok = await client.employee.findUnique({
            where: {
              id: empId,
            },
            select: {
              id: true,
            },
          });
          if (!ok) {
            throw new Error("해당 직원이 존재하지 않습니다.");
          }

          // 조건 2. 직원의 사장이 로그인 유저와 같은지
          const exactUser = await client.employee
            .findUnique({
              where: {
                id: empId,
              },
            })
            .store()
            .user({ select: { id: true } });
          if (exactUser.id !== loggedInUser.id) {
            throw new Error("자기의 직원일때만 Workday를 삭제 할 수 있습니다.");
          }

          const a = await client.workday
            .findUnique({
              where: {
                id: workdayId,
              },
            })
            .employees({
              where: {
                id: empId,
              },
            });

          if (!a) {
            throw new Error("해당 직원의 해당 출근일이 존재하지 않습니다.");
          }

          await client.workday.update({
            where: {
              id: workdayId,
            },
            data: {
              employees: {
                disconnect: {
                  id: empId,
                },
              },
            },
          });

          // disconnect 후 workday에 연결된 employees가 없을때 해당 workday 삭제
          await ZeroWorkdaysDelete();
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
