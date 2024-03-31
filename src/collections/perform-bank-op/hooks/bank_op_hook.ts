import { BeforeChangeHook } from "payload/dist/collections/config/types";

export const BankOpHook: BeforeChangeHook = async ({
  operation,
  req: { payload, user },
  data,
}) => {
  if (operation === "create") {
    let id = data.wallet;
    let newAvailableBalance = 0;
    if (id) {
      let wallet = await payload.findByID({ collection: "wallets", id });
      newAvailableBalance = wallet?.availableBalance + data?.amount;

      if (data.type === "debit") {
        newAvailableBalance = wallet.availableBalance - data?.amount;
      }
    }

    if (data.contributionId) {
      const contribution = await payload.findByID({
        collection: "contributions",
        id: data.contributionId,
      });

      const rotOrder =
        typeof contribution.rotationOrder === "string"
          ? contribution.rotationOrder
          : contribution.rotationOrder["id"];

      const contriWallet = await payload.find({
        collection: "wallets",
        where: { userId: { equals: rotOrder } },
      });

      const wallet = contriWallet.docs[0];

      id = wallet?.id

      newAvailableBalance =
        wallet?.availableBalance + contribution?.amountToContribute;
    }

    await payload.update({
      collection: "wallets",
      id,
      data: { availableBalance: newAvailableBalance, ...data },
    });

    await payload.create({
      collection: "transactions",
      data: {
        type: data?.type,
        reason: data?.reason,
        amount: data?.amount,
        userId: user?.id,
      },
    });    
  }
};
