import client from "../client";
import { getFormatDate } from "./employees.utils";

export default {
  Employee: {
    salary: async ({ id }) => {
      const { year, month } = getFormatDate();
      let total_time = 0;
      const emp = await client.employee.findUnique({
        where: {
          id,
        },
      });
      const emp_workdays = await client.employee
        .findUnique({
          where: { id },
          select: { id: true },
        })
        .workdays({
          where: {
            year,
            month,
          },
        });

      const timeArr = await Promise.all(
        emp_workdays.map(async (emp_workday) => {
          const { time } = await client.workTime.findUnique({
            where: {
              id: emp_workday.workTimeId,
            },
          });
          return await time;
        })
      );

      timeArr.map((time) => {
        total_time += time;
      });
      const salaryWage = total_time * emp.wage;
      return `${salaryWage}원`;
    },
  },
};
