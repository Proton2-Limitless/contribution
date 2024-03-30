import { CollectionConfig } from "payload/types";
import { canJoinContribution } from "./hooks/canjoin_contribution";
import { joinContributionHook } from "./hooks/join_contribution";

export const joinContribution: CollectionConfig = {
  slug: "join_contribution",
  access: {
    create: canJoinContribution,
  },
  hooks: {
    beforeChange: [joinContributionHook],
  },
  fields: [
    {
      name: "contributionId",
      type: "relationship",
      relationTo: "contributions",
      hasMany: false,
    },
  ],
};
