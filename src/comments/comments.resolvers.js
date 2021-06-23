import client from "../client";

export default {
  Comment: {
    isMine: async ({ id }, _, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: { id },
      });
      return comment.userId === loggedInUser.id;
    },
  },
};
