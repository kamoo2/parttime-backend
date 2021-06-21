import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeEmployees: protectedResolver(
      async (_, { storeId }, { loggedInUser }) => {
        const store = await client.store.findUnique({
          where: { id: storeId },
          select: { userId: true },
        });
        if (!store) {
          return null;
        }
        if (store.userId !== loggedInUser.id) {
          return null;
        }

        return client.employee.findMany({
          where: {
            storeId,
          },
          orderBy: [
            {
              createdAt: "asc",
            },
          ],
        });
      }
    ),
  },
};
