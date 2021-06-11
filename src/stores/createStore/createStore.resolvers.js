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
          const uniqueCheck = await client.store.findUnique({
            where: {
              storeNumber,
            },
          });

          if (uniqueCheck) {
            throw new Error("이미 존재하는 storeNumber입니다.");
          }

          ruleObjArr = CreateConnectObj(rule);
          holidayObjArr = CreateConnectObj(holiday);
          console.log(ruleObjArr);
          console.log(holidayObjArr);
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

          Promise.all(
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
