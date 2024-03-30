import { CollectionConfig } from "payload/types";
import { savingNewContribution } from "./hooks/before_saving_new_contribution";
import { CanUserContribute } from "./hooks/can_user_contribute";

export const Contributions: CollectionConfig = {
  slug: "contributions",
  access: {
    create: CanUserContribute,
    update: () => false, //if everybody has paid
  },
  hooks: {
    beforeChange: [savingNewContribution],
  },
  fields: [
    {
      name: "members",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: "intervals",
      type: "select",
      options: [
        { label: "week", value: "week" },
        { label: "month", value: "month" },
      ],
      access: {
        update: () => false,
      },
    },
    {
      name: "payDate",
      type: "date",
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: "totalSaving",
      type: "number",
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: "rotationOrder",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: "payoutHistory",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "open", value: "open" },
        { label: "close", value: "close" },
      ],
      defaultValue: "open",
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: "amountToContribute",
      type: "number",
      access: {
        update: () => false,
      },
    },
  ],
};