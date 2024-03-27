import { CollectionConfig } from "payload/types";
import { CanContribute } from "./hooks/contributionsUser";
import { startDate } from "./hooks/start_date";
import { PerformContrOpHook } from "../perform-bank-op/hooks/perform_contr_op_hook";

export const Contributions: CollectionConfig = {
  slug: "contributions",
  access: {
  },
  hooks: {
    beforeChange: [CanContribute,PerformContrOpHook],
  },
  fields: [
    {
      name: "operation",
      type: 'select',
      options: [
        {label: "new",value: "new"},
        {label: "exist",value: "exist"},
      ]
    },
    {
      name: "contributionId",
      type: 'text',
      access: {
        create: () => false
      }
    },
    {
      name: "users",
      type: "array",
      fields: [
        {
          name: "userId",
          type: "relationship",
          relationTo: "users",
          hasMany: false,
          access: {
            create: () => false,
          },
        },
      ],
    },
    {
      name: "amount",
      type: "number",
      required: true,
    },
    {
      name: "amountToContribute",
      type: "number",
      access: {
        update: () => false,
      },
      required: true,
    },
    {
      name: "frequency",
      type: "select",
      options: [
        { label: "week", value: "week" },
        { label: "day", value: "day" },
        { label: "month", value: "month" },
        { label: "year", value: "year" },
      ],
      required: true,
      access: {
        update: () => false
      }
    },
    {
      name: "totalAmount",
      type: "number",
    },
    {
      name: "paidUsers",
      type: "array",
      fields: [
        {
          name: "userId",
          type: "relationship",
          relationTo: "users",
          hasMany: false,
          access: {
            create: () => false,
          },
        },
      ],
    },
    {
      name: "reachedUser",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      access: {
        create: () => false,
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "open", value: "open" },
        { label: "close", value: "close" },
      ],
    },
    {
      name: "createdAt",
      type: "date",
      defaultValue: () => new Date(),
    },
    {
      name: "startDate",
      type: "date",
      defaultValue: () => new Date(),
      hooks: {
        beforeChange: [startDate],
      },
    },
    {
      name: "paybackDate",
      type: "date",
      defaultValue: () => new Date(),
    },
    {
      name: "totalUsers",
      type: "number",
      access: {
        create: () => true,
        update: () => false,
      },
    },
  ],
};
