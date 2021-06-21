import client from "../../client";

export default {
  Query: {
    seeStore: async (_, { id }) => {
      const store = await client.store.findUnique({
        where: {
          id,
        },
        include: {
          user: true,
          rules: true,
          holidays: true,
        },
      });
      if (!store) {
        return {
          ok: false,
          error: "존재하지 않는 스토어입니다.",
        };
      }

      console.log(store);
      return {
        ok: true,
        store,
      };
    },
  },
};
