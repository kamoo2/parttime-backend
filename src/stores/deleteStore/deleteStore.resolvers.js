import client from "../../client";
import { ZeroWorkdaysDelete } from "../../employees/employees.utils";
import { protectedResolver } from "../../users/users.utils";
import { DeleteNoneRelated } from "../stores.utils";

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
        if (!store) {
          throw Error("해당 가게가 존재하지 않습니다.");
        }
        if (store.userId !== loggedInUser.id) {
          throw Error("당신의 가게만 삭제할 수 있습니다.");
        }

        // store과 관련된 모든 employee 삭제
        const deleteEmployees = client.employee.deleteMany({
          where: {
            storeId: id,
          },
        });
        // store와 관련된 모든 photo 삭제

        const deletePhotos = client.storePhoto.deleteMany({
          where: {
            storeId: id,
          },
        });
        const deleteSails = client.sail.deleteMany({
          where: {
            storeId: id,
          },
        });
        // store 삭제
        const deleteStore = client.store.delete({
          where: {
            id,
          },
        });

        // store와 관련된 모든 객체 삭제 후 store 삭제(CASCADING DELETE)
        await client.$transaction([
          deleteEmployees,
          deletePhotos,
          deleteSails,
          deleteStore,
        ]);

        // store 삭제 후 해당 category의 관련 store가 없다면 그 category 삭제

        ZeroWorkdaysDelete();
        DeleteNoneRelated("category");
        DeleteNoneRelated("rule");
        DeleteNoneRelated("holiday");

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
