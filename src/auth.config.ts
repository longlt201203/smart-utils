import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google";
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },

} satisfies NextAuthConfig;