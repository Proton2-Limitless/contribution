import { Access } from "payload/config";

export const ReadWallet: Access = ({ req }) => {
  return {
    userId: {
      equals: req.user?.id,
    },
  };
};
