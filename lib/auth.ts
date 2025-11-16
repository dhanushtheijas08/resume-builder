import { PrismaClient } from "@/app/generated/prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: "",
      clientSecret: "",
    },
    github: {
      clientId: "",
      clientSecret: "",
    },
  },
  plugins: [nextCookies()],
});
