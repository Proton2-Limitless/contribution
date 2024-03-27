import { CollectionConfig } from "payload/types";
import { admins } from "../user/access/admins";

export const PerformBankOp: CollectionConfig = {
  slug: "perform_bank_op",
  access: {
    create: async ({ req: { payload, user }, data }) => {
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
    },
    update: () => false,
    delete: () => false,
    read: admins,
  },
  fields: [
    {
      name: "wallet",
      type: "relationship",
      relationTo: "wallets",
      hasMany: false,
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Credit", value: "credit" },
        { label: "Debit", value: "debit" },
      ],
      label: "Type",
      required: true,
    },
    {
      name: "reason",
      type: "text",
      label: "Reason",
      required: true,
    },
    {
      name: "amount",
      type: "number",
      label: "Amount",
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ operation, req: { payload, user }, data }) => {
        if (operation === "create") {
          const id = data?.wallet;
          const wallet = await payload.findByID({ collection: "wallets", id });
          let newAvailableBalance = wallet.availableBalance + data?.amount;
          if (data.type === "debit") {
            newAvailableBalance = wallet.availableBalance - data?.amount;
          }
          await payload.update({
            collection: "wallets",
            id,
            data: { availableBalance: newAvailableBalance, ...data },
          });

          await payload.create({
            collection: "transactions",
            data: {
              type: data?.type,
              reason: data?.reason,
              amount: data?.amount,
              userId: user?.id,
            },
          });
        }
      },
    ],
  },
};
