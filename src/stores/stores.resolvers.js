import client from "../client";
import { MakeTodayDateSlug } from "./stores.utils";

export default {
  Category: {
    total_stores: (root) =>
      client.store.count({
        where: {
          categoryId: root.id,
        },
      }),
    stores: ({ id }, { page }) =>
      client.store.findMany({
        where: {
          categoryId: id,
        },
        take: 10,
        skip: page ? (page - 1) * 10 : 0,
      }),
  },
  Store: {
    employees: ({ id }, { page }) => {
      return client.employee.findMany({
        where: {
          storeId: id,
        },
        take: 10,
        skip: page ? (page - 1) * 10 : 0,
      });
    },
    photos: ({ id }) =>
      client.storePhoto.findMany({
        where: {
          storeId: id,
        },
      }),
    total_photos: ({ id }) =>
      client.storePhoto.count({
        where: {
          storeId: id,
        },
      }),
    total_employees: ({ id }) =>
      client.employee.count({ where: { storeId: id } }),
    total_year_sail: async ({ id }) => {
      let total = 0;
      // 현재달 매출 확인
      const now = new Date();
      const year_sail = await client.sail.findMany({
        where: {
          storeId: id,
          year: now.getFullYear(),
        },
        select: {
          sail: true,
        },
      });

      year_sail.forEach((sail) => (total += sail.sail));
      return total;
    },
    total_month_sail: async ({ id }) => {
      let total = 0;
      // 현재달 매출 확인
      const now = new Date();
      const month_sail = await client.sail.findMany({
        where: {
          storeId: id,
          year: now.getFullYear(),
          month: now.getMonth() + 1,
        },
        select: {
          sail: true,
        },
      });

      month_sail.forEach((sail) => (total += sail.sail));
      return total;
    },
    today_sail: async ({ id }) => {
      let total = 0;
      const slug = MakeTodayDateSlug();
      console.log(slug);
      const today_sail = await client.sail.findFirst({
        where: {
          storeId: id,
          slug,
        },
        select: {
          sail: true,
        },
      });
      return today_sail ? today_sail.sail : 0;
    },
    isMine: async ({ id }, _, { loggedInUser }) => {
      const storeBoss = await client.store
        .findUnique({
          where: {
            id,
          },
        })
        .user({
          select: {
            id: true,
          },
        });
      return storeBoss.id === loggedInUser.id;
    },
    total_page: async ({ id }, { take, home }, { loggedInUser }) => {
      if (home) {
        const count = await client.store.count({ where: {} });
        return Math.ceil(count / take);
      } else {
        const count = await client.store.count({
          where: { userId: loggedInUser.id },
        });
        return Math.ceil(count / take);
      }
    },
  },
};
