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
