import { CollectionConfig } from "payload/types";
import { BankOpHook } from "./hooks/bank_op_hook";
import { UpdateWallet } from "../wallet/access/update_wallet";
import { ReadWallet } from "../wallet/access/read_wallet";
import { admins } from "../user/access/admins";
import { checkRole } from "../user/access/checkRole";

export const PerformBankOp: CollectionConfig = {
  slug: "perform_bank_op",
  access: {
    // read: ReadWallet,
    create: UpdateWallet,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: "contributionId",
      type: "text",
      access: {
        create: ({ req: { user } }) => checkRole(["admin"], user),
        update: () => false,
      },
      hooks: {
        afterChange: [
          async ({ req, value }) => {
            if (value) {
              const contribution = await req.payload.findByID({
                collection: "contributions",
                id: value,
              });
              const members = contribution.members.filter(
                (contr) => contr !== contribution.rotationOrder
              );
              const rotationOrder = members[0];
              const payoutHistory = [
                ...contribution.payoutHistory,
                contribution.rotationOrder,
              ];

              await req.payload.update({
                collection: "contributions",
                id: value,
                data: {
                  status: "close",
                  members: members,
                  rotationOrder,
                  payoutHistory,
                },
              });
            }
          },
        ],
      },
    },
    {
      name: "wallet",
      type: "text",
      // relationTo: "wallets",
      // hasMany: false,
      // required: true,
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
    beforeChange: [BankOpHook],
  },
};
