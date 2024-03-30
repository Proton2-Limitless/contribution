import { CollectionConfig } from "payload/types";
import { anyone } from "../user/access/anyone";
import { walletBeforeCreate } from "../wallet/hooks/walletbeforecreate";
import { ReadTransaction } from "./access/read_transaction";

export const Transactions: CollectionConfig = {
  slug: "transactions",
  access: {
    read: ReadTransaction,
    create: anyone,
    update: () => false,
    delete: () => false,
  },
  fields: [
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
    {
      name: "userId",
      type: "relationship",
      relationTo: "users",
      label: "User",
      access: {
        create: () => false,
      },
    },
    {
      name: "createdAt",
      type: "date",
      label: "Created At",
      defaultValue: () => new Date(),
      access: {
        create: () => false,
      },
    },
  ],
};
