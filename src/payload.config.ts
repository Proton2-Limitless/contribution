import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { buildConfig } from "payload/config";

import { Users } from "./collections/user/Users";
import { Wallets } from "./collections/wallet/wallet";
import { Transactions } from "./collections/transaction/transaction";
import { PerformBankOp } from "./collections/perform-bank-op/perform_bank_op";
import { Contributions } from "./collections/contribution/contribution";

export default buildConfig({
  collections: [Users, Wallets, Transactions, PerformBankOp, Contributions],
  admin: {
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
    process.env.PAYLOAD_PUBLIC_SITE_URL || "",
  ].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
    process.env.PAYLOAD_PUBLIC_SITE_URL || "",
  ].filter(Boolean),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
