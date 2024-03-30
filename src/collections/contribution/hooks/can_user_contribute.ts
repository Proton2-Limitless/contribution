import { Access } from "payload/config";

export const CanUserContribute: Access = async ({ req: { payload,user }, data }) => {
    const availableBalance = (
      await payload.find({ collection: "wallets",where: {userId: {equals: user?.id}  }})
    ).docs[0]?.availableBalance;

    if (availableBalance - data?.amountToContribute < 0) {
      return false;
    }
    return true;
};
