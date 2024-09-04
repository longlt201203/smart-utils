import { PrismaSingleton } from "@/prisma";
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google";

const prisma = PrismaSingleton.getClient();
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google({
    // profile: async (profile) => {
    //   return await prisma.user.findFirst({ where: { email: profile.email } });
    // }
  })],
  callbacks: {
    signIn: async ({ profile }) => {
      if (profile && profile.email) {
        const user = await prisma.user.findFirst({ where: { email: profile.email } });
        return user ? true : false;
      }
      return false;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },

} satisfies NextAuthConfig;