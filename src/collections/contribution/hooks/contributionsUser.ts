import type { BeforeChangeHook } from "payload/dist/collections/config/types";

export const CanContribute: BeforeChangeHook = async ({
  req: { payload, user },
  operation,
  data,
  originalDoc,
}) => {
  console.log(originalDoc)
  const canContribute = originalDoc?.users?.length < originalDoc?.totalUsers;
  console.log(canContribute)
  if (canContribute) {
    if (operation === "update") {
      await payload.update({
        collection: "contributions",
        where: {
            id: originalDoc?.id
        },
        data: {
            users: [...originalDoc?.users,user?.id]
        }
      })
    }
  }
  return data;
};
