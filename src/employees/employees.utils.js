import client from "../client";

export const getFormatDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return {
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
  };
};

export const ZeroWorkdaysDelete = async () => {
  await client.workday.deleteMany({
    where: {
      employees: {
        none: {},
      },
    },
  });
};

export const CreateConnectObj = (str) => {
  const strArr = str.replace(/(\s*)/g, "").toLowerCase().split(",");
  const objArr = strArr.map((item) => {
    return {
      where: {
        name: item,
      },
      create: {
        name: item,
      },
    };
  });
  return objArr;
};
