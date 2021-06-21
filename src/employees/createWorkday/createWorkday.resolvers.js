import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { getFormatDate, ZeroWorkdaysDelete } from "../employees.utils";
export default {
  Mutation: {
    createWorkday: protectedResolver(
      async (
        _,
        { year, month, day, employeeId, workTime },
        { loggedInUser }
      ) => {
        try {
          const user = await client.employee
            .findUnique({
              where: {
                id: employeeId,
              },
            })
            .store()
            .user({
              select: {
                id: true,
              },
            });
          if (!user) {
            throw Error("해당 직원이 존재하지 않습니다.");
          }

          // 로그인 한 user랑 변경할려는 직원의 가게의 보스와 같아야함
          if (user.id !== loggedInUser.id) {
            throw Error("자기의 가게 직원만 생성할 수 있습니다.");
          }
          const newMonth = month < 10 ? `0${month}` : `${month}`;
          const newDay = day < 10 ? `0${day}` : `${day}`;

          const slug = `${year}-${newMonth}-${newDay}`;
          // 오늘 날짜
          const today = getFormatDate();

          // year이 2022 그럼 뒤에꺼 필요없이 되면안돼 O
          // month가 8이야 그러면 되면안돼 O
          // month가 6이고 day가 7이상이야 그러면 안돼 O
          //
          if (
            year > today.year ||
            (year === today.year && month > today.month) ||
            (year === today.year && month === today.month && day > today.day)
          ) {
            throw Error("미래의 출근시간은 조정할 수 없습니다.");
          }

          if (workTime === 0) {
            throw Error("근무 시간을 입력해주세요.");
          }
          const existWorkday = await client.workday.findFirst({
            where: {
              slug,
              employees: {
                some: {
                  id: employeeId,
                },
              },
            },
          });
          const exist = await client.workday.findFirst({
            where: {
              slug,
              workTime: {
                time: workTime,
              },
            },
          });

          if (existWorkday) {
            const updatedWorkday = await client.workday.update({
              where: {
                id: existWorkday.id,
              },
              data: {
                employees: {
                  disconnect: {
                    id: employeeId,
                  },
                },
              },
            });
            ZeroWorkdaysDelete();
          } else {
            if (exist) {
              await client.workday.update({
                where: {
                  id: exist.id,
                },
                data: {
                  employees: {
                    connect: {
                      id: employeeId,
                    },
                  },
                },
              });
            } else {
              await client.workday.create({
                data: {
                  year,
                  month,
                  day,
                  slug,
                  workTime: {
                    connect: {
                      time: workTime,
                    },
                  },
                  employees: {
                    connect: {
                      id: employeeId,
                    },
                  },
                },
              });
            }
          }

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
