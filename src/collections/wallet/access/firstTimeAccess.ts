import type { Access } from "payload/config";

export const firstTimeWalletAccess: Access = async ({
  req: { user, payload },
}) => {
  const hasWallet = await payload.find({
    collection: "wallets",
    where: { userId: { equals: user.id } },
  });
  
  if (hasWallet.docs.length > 0) {
    return false;
  }
  return true;
};
