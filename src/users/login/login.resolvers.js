import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "존재하지 않는 User입니다.",
        };
      }
      const loginOK = await bcrypt.compare(password, user.password);
      if (!loginOK) {
        return {
          ok: false,
          error: "password가 틀립니다.",
        };
      }
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
