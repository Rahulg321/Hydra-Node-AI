import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import db from "@/lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      // console.log("token and user in jwt callback", token, user);

      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      // set the userId returned from the jwt callback in the session callback
      if (session?.user) {
        session.user.id = session.user.id;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
