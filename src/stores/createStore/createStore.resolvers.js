import client from "../../client";
import { CreateConnectObj } from "../../employees/employees.utils";
import { uploadStorePhotos } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createStore: protectedResolver(
      async (
        _,
        { store, storeNumber, category, files, rule, holiday },
        { loggedInUser }
      ) => {
        try {
          let photoUrls = [];
          let ruleObjArr = [];
          let holidayObjArr = [];

          const ok = await client.store.findUnique({
            where: { storeNumber },
            select: { id: true },
          });
          if (ok) {
            throw Error("이미 존재하는 PhoneNumber 입니다.");
          }

          if (rule) {
            ruleObjArr = CreateConnectObj(rule);
          }
          if (holiday) {
            holidayObjArr = CreateConnectObj(holiday);
          }
          const newStore = await client.store.create({
            data: {
              store,
              storeNumber,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              rules: {
                connectOrCreate: ruleObjArr,
              },
              category: {
                connectOrCreate: {
                  where: {
                    name: category,
                  },
                  create: {
                    name: category,
                  },
                },
              },
              holidays: {
                connectOrCreate: holidayObjArr,
              },
            },
          });
          if (files) {
            photoUrls = await Promise.all(
              files.map(async (file) => {
                return await uploadStorePhotos(
                  file,
                  loggedInUser.id,
                  `${newStore.id}-${newStore.store}`
                );
              })
            );
          }

          await Promise.all(
            photoUrls.map(async (url) => {
              await client.storePhoto.create({
                data: {
                  photoURL: url,
                  store: {
                    connect: {
                      id: newStore.id,
                    },
                  },
                },
              });
            })
          );

          return {
            ok: true,
            store: newStore,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.toString().slice(7),
          };
        }
      }
    ),
  },
};
