import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeWorkdays: protectedResolver(
      async (_, { employeeId }, { loggedInUser }) => {
        const emp = await client.employee
          .findUnique({
            where: {
              id: employeeId,
            },
          })
          .store({
            select: {
              userId: true,
            },
          });

        if (!emp) {
          console.log("존재x직원");
          return [];
        }
        if (emp.userId !== loggedInUser.id) {
          console.log("보스아님");
          return [];
        }
        const workdays = await client.workday.findMany({
          where: {
            employees: {
              some: {
                id: employeeId,
              },
            },
          },
          include: {
            workTime: true,
          },
        });
        console.log(workdays);
        return workdays;
      }
    ),
  },
};
