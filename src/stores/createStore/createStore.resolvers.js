import client from "../../client";
import { uploadStorePhotos } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createStore: protectedResolver(
      async (_, { store, storeNumber, category, files }, { loggedInUser }) => {
        try {
          let photoUrls = [];
          const uniqueCheck = await client.store.findUnique({
            where: {
              storeNumber,
            },
          });

          if (uniqueCheck) {
            throw Error("이미 존재하는 storeNumber입니다.");
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
