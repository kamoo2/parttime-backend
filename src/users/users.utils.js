import client from "../client";
import jwt from "jsonwebtoken";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
};

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return { ok: false, error: "로그인을 해주세요." };
    }
    return ourResolver(root, args, context, info);
  };
