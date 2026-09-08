import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";

import { db } from "@formify/db";
import * as schema from "@formify/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: [process.env.WEB_URL!],

  emailAndPassword: {
    enabled: true,
  },
});
