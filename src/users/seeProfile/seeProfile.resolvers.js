import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeProfile: protectedResolver(async (_, { id }) => {
      try {
        const user = await client.user.findUnique({
          where: {
            id,
          },
        });
        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.toString().slice(7),
        };
      }
    }),
  },
};
