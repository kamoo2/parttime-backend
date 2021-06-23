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
          return [];
        }
        if (emp.userId !== loggedInUser.id) {
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
        return workdays;
      }
    ),
  },
};
