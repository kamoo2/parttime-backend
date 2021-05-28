import client from "../../client";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    createAccount: async (
      _,
      { username, name, email, password, phoneNumber },
      { loggedInUser }
    ) => {
      console.log(loggedInUser);
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
            {
              phoneNumber,
            },
          ],
        },
      });
      if (existingUser) {
        return {
          ok: false,
          error: "중복되는 username email phoneNumber이 존재합니다.",
        };
      }
      const hashPassword = await bcrypt.hash(password, 10);
      await client.user.create({
        data: {
          username,
          name,
          email,
          phoneNumber,
          password: hashPassword,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
