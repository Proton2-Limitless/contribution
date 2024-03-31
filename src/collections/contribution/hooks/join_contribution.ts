import { BeforeChangeHook } from "payload/dist/collections/config/types";

export const joinContributionHook: BeforeChangeHook = async ({ req, data }) => {
  const contribution = await req.payload.findByID({
    collection: "contributions",
    id: data.contributionId,
  });

  let newMembers = [
    ...contribution.members.map((member) =>
      typeof member === "string" ? member : member["id"]
    ),
    req.user?.id,
  ];

  await req.payload.update({
    collection: "contributions",
    where: { id: { equals: data?.contributionId } },
    data: {
      members: newMembers,
      totalSaving: contribution.totalSaving + contribution.amountToContribute,
    },
  });

  const userWallet = await req.payload.find({
    collection: "wallets",
    where: { userId: { equals: req.user?.id } },
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
