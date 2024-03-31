import { CollectionConfig } from "payload/types";
import { BankOpHook } from "./hooks/bank_op_hook";
import { UpdateWallet } from "../wallet/access/update_wallet";
import { ReadWallet } from "../wallet/access/read_wallet";
import { admins } from "../user/access/admins";
import { checkRole } from "../user/access/checkRole";
import { payContributedUser } from "./hooks/paycontributed_user";

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
          payContributedUser
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
