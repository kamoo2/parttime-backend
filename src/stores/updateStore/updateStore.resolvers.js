import client from "../../client";
import { uploadStorePhotos } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    updateStore: protectedResolver(
      async (
        _,
        { id, store, storeNumber, category, files },
        { loggedInUser }
      ) => {
        try {
          let photoUrls = [];
          const ok = await client.store.findFirst({
            where: {
              id,
            },
            select: {
              id: true,
              store: true,
              categoryId: true,
              userId: true,
            },
          });

          if (!ok) {
            throw Error("가게가 존재하지 않습니다.");
          }
          // 로그인 유저와 가게 주인이 일치하는지 체크
          if (ok.userId !== loggedInUser.id) {
            throw Error("고객님 가게의 정보만 수정가능합니다.");
          }

          // storeNumber 중복 체크
          if (storeNumber) {
            const exist = await client.store.findUnique({
              where: {
                storeNumber,
              },
            });
            if (exist) {
              throw Error("중복된 storeNumber입니다. 다시 입력해주세요.");
            }
          }

          // files가 존재할 때 files를 s3에 업로드하고 photo생성 후 연결
          if (files) {
            photoUrls = await Promise.all(
              files.map(async (file) => {
                return await uploadStorePhotos(
                  file,
                  loggedInUser.id,
                  `${ok.id}-${ok.store}`
                );
              })
            );
          }
          const newStore = await client.store.update({
            where: {
              id,
            },
            data: {
              store,
              storeNumber,
              ...(category && {
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
              }),
              ...(photoUrls.length > 0 && {
                photos: {
                  deleteMany: {},
                },
              }),
            },
          });

          const relatedCountZero = await client.store.count({
            where: {
              categoryId: ok.categoryId,
            },
          });

          if (relatedCountZero === 0) {
            await client.category.delete({
              where: {
                id: ok.categoryId,
              },
            });
          }

          if (relatedCountZero)
            Promise.all(
              photoUrls.map(async (url) => {
                await client.storePhoto.create({
                  data: {
                    photoURL: url,
                    store: {
                      connect: {
                        id,
                      },
                    },
                  },
                });
              })
            );
          return {
            ok: true,
            newStore,
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
