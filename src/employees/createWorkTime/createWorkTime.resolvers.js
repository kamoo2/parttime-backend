import client from "../../client";

export default {
  Mutation: {
    createWorkTime: async () => {
      await client.workTime.createMany({
        data: [
          {
            time: 1,
          },
          {
            time: 2,
          },
          {
            time: 3,
          },
          {
            time: 4,
          },
          {
            time: 5,
          },
          {
            time: 6,
          },
          {
            time: 7,
          },
          {
            time: 8,
          },
          {
            time: 9,
          },
          {
            time: 10,
          },
          {
            time: 11,
          },
          {
            time: 12,
          },
        ],
      });
      return {
        ok: true,
      };
    },
  },
};
