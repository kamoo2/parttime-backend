import client from "../client";

export const DeleteNoneRelated = async (field) => {
  if (field === "category") {
    await client.category.deleteMany({ where: { stores: { none: {} } } });
  } else if (field === "rule") {
    await client.rule.deleteMany({ where: { stores: { none: {} } } });
  } else if (field === "holiday") {
    await client.holiday.deleteMany({ where: { stores: { none: {} } } });
  } else {
    return;
  }
};

export const MakeTodayDateSlug = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const slug = `${year}-${month}-${day}`;
  return slug;
};
