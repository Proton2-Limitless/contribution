import type { BeforeChangeHook } from "payload/dist/collections/config/types";

export const PerformContrOpHook: BeforeChangeHook = async ({
  operation,
  req: { payload, user },
  data,
}) => {
  const wallet = await payload.find({collection: "wallets",where:{userId: user}})
  const canContribute = wallet.docs[0].availableBalance >= data?.amount;
  if (canContribute) {
    if (operation === "update") {
      const contribution = await payload.findByID({
        collection: "contributions",
        id: data?.contributionId,
      });
      await payload.update({
        collection: "contributions",
        id: contribution.id,
        data: {
            ...contribution,
            users: [...contribution.users,user?.id],
            totalAmount: contribution.totalAmount + data.amount,
        }
      });
    }
  }
};
