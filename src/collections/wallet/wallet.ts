import { CollectionConfig } from "payload/types";
import updateWalletAvailBall from "./access/updateWalletAvailBal";
import { walletBeforeCreate } from "./hooks/walletbeforecreate";
import { firstTimeWalletAccess } from "./access/firstTimeAccess";

export const Wallets: CollectionConfig = {
  slug: 'wallets',
  access: {
    read: ({ req }) => ({ userId: req.user.id }), 
    create: firstTimeWalletAccess, 
    delete: () => false, 
  },
  hooks: {
    beforeChange: [walletBeforeCreate]
  },
  fields: [
    { 
      name: 'userId',
      type: 'relationship',
      relationTo: 'users', 
      hasMany: false,
      access: {
        create: () => false
      },
    },
    {
      name: 'availableBalance',
      type: 'number',
      defaultValue: 0,
      access: {
        update: updateWalletAvailBall,
        create: () => false
      }
    },
  ],
};

//a user can only have one wallet