import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt";
import client from "../../client";
import { uploadAvatar } from "../../shared/shared.utils";
export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          username,
          name,
          email,
          password: newPassword,
          phoneNumber,
          location,
          file,
        },
        { loggedInUser }
      ) => {
        try {
          let addAvatarURL = null;
          if (username) {
            const existingUser = await client.user.findUnique({
              where: {
                username,
              },
            });
            if (existingUser) {
              throw new Error("중복된 username을 가진 User가 존재합니다.");
            }
          }
          if (email) {
            const existingUser = await client.user.findUnique({
              where: {
                email,
              },
            });
            if (existingUser) {
              throw new Error("중복된 email을 가진 User가 존재합니다.");
            }
          }
          if (phoneNumber) {
            const existingUser = await client.user.findUnique({
              where: {
                phoneNumber,
              },
            });
            if (existingUser) {
              throw new Error("중복된 phoneNumber을 가진 User가 존재합니다.");
            }
          }
          if (file) {
            addAvatarURL = await uploadAvatar(
              file,
              loggedInUser.id,
              "UserAvatar"
            );
          }
          let hashPassword = null;
          if (newPassword) {
            hashPassword = await bcrypt.hash(newPassword, 10);
          }

          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              username,
              name,
              email,
              phoneNumber,
              location,
              ...(addAvatarURL && { avatarURL: addAvatarURL }),
              ...(newPassword && { password: hashPassword }),
            },
          });

          return {
            ok: true,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.toString().slice(7),
          };
        }
      }
    ),
  },
};
