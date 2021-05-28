import { protectedResolver } from "../users.utils";
import fs from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
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
          avatarURL,
        },
        { loggedInUser }
      ) => {
        try {
          let addAvatarURL = null;
          if (avatarURL) {
            const { filename, createReadStream } = await avatarURL;
            const readStream = createReadStream();
            const uploadFileName = `${
              loggedInUser.id
            }-${Date.now()}-${filename}`;
            const writeStream = fs.createWriteStream(
              process.cwd() + "/uploads/" + uploadFileName
            );
            readStream.pipe(writeStream);
            addAvatarURL = `http://localhost:4000/static/${uploadFileName}`;
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
            error: e.message,
          };
        }
      }
    ),
  },
};
