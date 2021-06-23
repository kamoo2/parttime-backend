import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({ where: { id } });
      if (!comment) {
        return {
          ok: false,
          error: "존재하지 않는 댓글입니다.",
        };
      }
      if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "자기 댓글만 삭제가능합니다.",
        };
      }
      await client.comment.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
