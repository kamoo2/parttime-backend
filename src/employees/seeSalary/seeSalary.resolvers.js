import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeSalary: protectedResolver(
      async (_, { employeeId, year, month }, { loggedInUser }) => {
        console.log(employeeId);
        const date = new Date();
        const emp = await client.employee.findUnique({
          where: {
            id: employeeId,
          },
          select: {
            id: true,
            store: true,
            wage: true,
            workdays: {
              where: {
                year: year ? year : date.getFullYear(),
                month,
              },
              orderBy: {
                day: "asc",
              },
            },
          },
        });

        if (emp.store.userId !== loggedInUser.id) {
          throw new Error("자기 가게의 직원 정보만 볼 수 있습니다.");
        }
        const workdayOfMonth = emp.workdays.length;
        // 달의 일한 총 시간 구하기
        const times = await Promise.all(
          emp.workdays.map(async (workday) => {
            const { time } = await client.workTime.findUnique({
              where: {
                id: workday.workTimeId,
              },
              select: {
                time: true,
              },
            });
            return time;
          })
        );

        const totalTime = times.reduce((acc, value) => {
          return acc + value;
        }, 0);
        return {
          salary: totalTime * emp.wage,
          workdayOfMonth,
        };
      }
    ),
  },
};
