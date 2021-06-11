import client from "../../client";

export default {
  Query: {
    seeWorkTimes: () => client.workTime.findMany(),
  },
};
