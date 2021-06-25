import client from "../../client";
import { uploadAvatar } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    updateEmployee: protectedResolver(
      async (
        _,
        { id, name, age, wage, sex, phoneNumber, file },
        { loggedInUser }
      ) => {
        try {
          let avatarURL = null;
          // 직원의 가게 사장 ID
          const ok = await client.employee
            .findUnique({
              where: {
                id,
              },
            })
            .store()
            .user({ select: { id: true } });

          // 조건 1. 해당하는 id의 직원이 존재하는지
          if (!ok) {
            throw new Error("해당하는 직원이 존재하지 않습니다.");
          }

          // 조건 2. 직원이 존재하는데 사장의 id와 로그인 id가 일치하는지
          if (ok.id !== loggedInUser.id) {
            throw new Error("자기 직원의 정보만 수정가능합니다.");
          }

          // 조건 3. unique 필드를 edit할때 unique check
          if (phoneNumber) {
            const uniqueCheck = await client.employee.findUnique({
              where: {
                phoneNumber,
              },
              select: {
                id: true,
              },
            });
            if (uniqueCheck) {
              throw new Error("phoneNumber가 이미 존재합니다.");
            }
          }

          // file이 들어왔을때 새로 S3에 업로드하고 URL 변경
          const shop = await client.employee
            .findUnique({
              where: {
                id,
              },
            })
            .store({ select: { store: true, id: true } });

          if (file) {
            avatarURL = await uploadAvatar(
              file,
              loggedInUser.id,
              `EmployeeAvatar/${shop.id}-${shop.store}`
            );
          }

          await client.employee.update({
            where: {
              id,
            },
            data: {
              name,
              ...(age && { age }),
              wage,
              ...(phoneNumber && { phoneNumber }),
              sex,
              ...(avatarURL && { avatarURL }),
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
