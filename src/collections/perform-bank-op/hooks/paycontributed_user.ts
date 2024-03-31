import { FieldHook } from "payload/types";

export const payContributedUser: FieldHook = async ({ req, value }) => {
  if (value) {
    const contribution = await req.payload.findByID({
      collection: "contributions",
      id: value,
    });
    const rotOrder =
      typeof contribution.rotationOrder === "string"
        ? contribution.rotationOrder
        : contribution.rotationOrder["id"];

    const members = contribution.members
      .filter((contr) =>
        typeof contr === "string"
          ? contr !== rotOrder
          : contr["id"] !== rotOrder
      )
      .map((member) => (typeof member === "string" ? member : member["id"]));
    const rotationOrder = members[0];
    const payoutHistory = [
      ...(contribution.payoutHistory.map((member) =>
        typeof member === "string" ? member : member["id"]
      ) || []),
      rotOrder,
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
};
