import client from "../../client";

export default {
  Mutation: {
    createStore: (_, { store, phone, wage }) =>
      client.store.create({
        data: {
          store,
          phone,
          wage,
        },
      }),
  },
};
