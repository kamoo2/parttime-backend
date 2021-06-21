import client from "../../client";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    createAccount: async (_, { username, name, email, password }) => {
      try {
        if (username) {
          const ok = await client.user.findUnique({ where: { username } });
          if (ok) {
            throw Error("이미 존재하는 Username 입니다.");
          }
        }
        if (email) {
          const ok = await client.user.findUnique({ where: { email } });
          if (ok) {
            throw Error("이미 존재하는 Email 입니다.");
          }
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            name,
            email,
            password: hashPassword,
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
    },
  },
};
