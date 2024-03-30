import { Access } from "payload/config";

export const canUserContrbute: Access = async ({
  req: { payload, user },
  data,
}) => {
  const userWallet = await payload.find({
    collection: "wallets",
    where: { userId: user?.id },
  });
  if (
    userWallet.docs.length &&
    userWallet.docs[0].availableBalance >= data?.amountToContribute
  ) {
    return true;
  }
  return false;
};
