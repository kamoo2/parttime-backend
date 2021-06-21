import client from "../../client";
import { DeleteNoneRelated } from "../../stores/stores.utils";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    deleteAccount: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        const deleteEmployees = client.employee.deleteMany({
          where: {
            store: {
              userId: loggedInUser.id,
            },
          },
        });

        const deletePhotos = client.storePhoto.deleteMany({
          where: {
            store: {
              userId: loggedInUser.id,
            },
          },
        });

        const deleteStore = client.store.deleteMany({
          where: { userId: loggedInUser.id },
        });

        const deleteUser = client.user.delete({
          where: { id: loggedInUser.id },
        });
        await client.$transaction([
          deleteEmployees,
          deletePhotos,
          deleteStore,
          deleteUser,
        ]);

        DeleteNoneRelated("category");
        DeleteNoneRelated("rule");
        DeleteNoneRelated("holiday");

        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          error: err,
        };
      }
    }),
  },
};
