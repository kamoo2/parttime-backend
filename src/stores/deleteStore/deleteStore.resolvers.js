import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteStore: protectedResolver(async (_, { id }, { loggedInUser }) => {
      try {
        const store = await client.store.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
            categoryId: true,
          },
        });
        if (store.userId !== loggedInUser.id) {
          throw new Error("당신의 가게만 삭제할 수 있습니다.");
        }

        // store과 관련된 모든 employee 삭제
        await client.employee.deleteMany({
          where: {
            storeId: id,
          },
        });
        // store 삭제
        await client.store.delete({
          where: {
            id,
          },
        });

        // store 삭제 후 해당 category의 관련 store가 없다면 그 category 삭제

        const ok = await client.store.count({
          where: {
            categoryId: store.categoryId,
          },
        });

        if (ok === 0) {
          await client.category.delete({
            where: {
              id: store.categoryId,
            },
          });
        }

        return {
          ok: true,
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
