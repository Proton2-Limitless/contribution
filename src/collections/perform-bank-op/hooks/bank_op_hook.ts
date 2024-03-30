import { BeforeChangeHook } from "payload/dist/collections/config/types";

export const BankOpHook: BeforeChangeHook = async ({
  operation,
  req: { payload, user },
  data,
}) => {
  if (operation === "create") {
    const id = data.wallet;
    let newAvailableBalance = 0;
    if (id) {
      let wallet = await payload.findByID({ collection: "wallets", id });
      newAvailableBalance = wallet?.availableBalance + data?.amount;

      if (data.type === "debit") {
        newAvailableBalance = wallet.availableBalance - data?.amount;
      }
    }

    // if (data.contributionId) {
    //   const contribution = await payload.findByID({
    //     collection: "contributions",
    //     id: data.contributionId,
    //   });

    //   const contriWallet = await payload.find({
    //     collection: "wallets",
    //     where: { userId: { equals: contribution.rotationOrder } },
    //   });

    //   const wallet = contriWallet.docs[0];
    //   console.log(contribution.rotationOrder);
    //   console.log(contriWallet);
      
    //   newAvailableBalance =
    //     wallet.availableBalance + contribution?.amountToContribute;
    // }

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
