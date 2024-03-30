import { BeforeChangeHook } from "payload/dist/collections/config/types";

export const joinContributionHook: BeforeChangeHook = async ({
  req,
  data,
}) => {
  const contribution = await req.payload.findByID({
    collection: "contributions",
    id: data.contributionId,
  });

  await req.payload.update({
    collection: "contributions",
    where: { id: { equals: data?.contributionId } },
    data: {
      members: [...contribution.members, req.user.id],
      totalSaving: contribution.totalSaving + contribution.amountToContribute,
    },
  });

  const userWallet = await req.payload.find({
    collection: "wallets",
    where: { userId: req.user?.id },
  });

  await req.payload.update({
    collection: "wallets",
    id: userWallet.docs[0].id,
    data: {
      availableBalance:
        userWallet.docs[0].availableBalance - contribution.amountToContribute,
    },
  });
};
