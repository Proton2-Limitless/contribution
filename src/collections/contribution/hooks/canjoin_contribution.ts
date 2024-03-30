import { Access } from "payload/config";

export const canJoinContribution: Access = async ({ req, data }) => {
  if (data.contributionId) {
    console.log(data.contributionId);
    const contribution = await req.payload.findByID({
      collection: "contributions",
      id: data.contributionId,
    });

    const checkIfPaymentHasStart =
      contribution?.status === "close" || contribution?.payDate < new Date();

    const availableBalance = (
      await req.payload.find({
        collection: "wallets",
        where: { userId: { equals: req.user?.id } },
      })
    ).docs[0]?.availableBalance;

    if (
      !contribution ||
      checkIfPaymentHasStart ||
      availableBalance - contribution?.amountToContribute < 0
    )
      return false;
  }
  //   66080d740a35042fa9a59d93
  return true;
};
