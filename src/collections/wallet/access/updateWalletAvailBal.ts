import { FieldAccess } from "payload/types";

const updateWalletAvailBall: FieldAccess = async ({
  req: { payload, user },
  id,
}) => {
  if (id) {
    const wallet = await payload.findByID({ collection: "wallets", id });

    if (wallet?.userId === user?.id) {
      return true;
    }
    return false;
  }
};

export default updateWalletAvailBall;
