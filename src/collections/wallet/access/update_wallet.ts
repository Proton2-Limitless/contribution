import { Access } from "payload/config";

export const UpdateWallet: Access = async ({ req: { payload }, data }) => {
  if (data.type === "debit") {
    const availableBalance = (
      await payload.findByID({ collection: "wallets", id: data?.wallet })
    ).availableBalance;

    if (availableBalance - data?.amount < 0) {
      return false;
    }
    return true;
  }

  return true;
};
