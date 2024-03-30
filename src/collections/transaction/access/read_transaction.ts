import { Access } from "payload/config";

export const ReadTransaction: Access = ({ req }) => {
  if (req.user.roles.includes("admin")) {
    return true;
  }
  return {
    userId: {
      equals: req.user?.id,
    },
  };
};
