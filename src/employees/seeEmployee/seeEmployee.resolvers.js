import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeEmployee: protectedResolver(async (_, { id }, { loggedInUser }) => {
      try {
        const boss = await client.employee
          .findUnique({
            where: { id },
          })
          .store()
          .user();
        if (!boss) {
          throw new Error("해당 직원은 존재하지 않습니다.");
        }
        if (boss.id !== loggedInUser.id) {
          throw new Error("당신의 직원만 볼 수 있습니다.");
        }

        const emp = await client.employee.findUnique({ where: { id } });
        return {
          ok: true,
          employee: emp,
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
