import { CollectionConfig } from "payload/types";
import updateWalletAvailBall from "./access/updateWalletAvailBal";
import { walletBeforeCreate } from "./hooks/walletbeforecreate";
import { firstTimeWalletAccess } from "./access/firstTimeAccess";
import { ReadWallet } from "./access/read_wallet";
import { UpdateWallet } from "./access/update_wallet";

export const Wallets: CollectionConfig = {
  slug: "wallets",
  access: {
    read: ReadWallet,
    create: firstTimeWalletAccess,
    update: UpdateWallet,
    delete: () => false,
  },
  fields: [
    {
      name: "userId",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      access: {
        create: () => false,
      },
      hooks: {
        beforeChange: [walletBeforeCreate],
      },
    },
    {
      name: "availableBalance",
      type: "number",
      defaultValue: 0,
      access: {
        update: updateWalletAvailBall,
        create: () => false,
      },
    },
  ],
};

//a user can only have one wallet
