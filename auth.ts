import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import db from "@/lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  events: {
    //this event is only triggered when we use an OAuth provider
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id as string);

      // prevent signin without email verification
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      return true;
    },

    async jwt({ token, user }) {
      // If this is the first time the token is created, set the `sub` and other properties
      if (user) {
        token.sub = user.id;
      }

      // If the token already exists, keep the `sub` and `role` properties
      if (token.sub) {
        const existingUser = await getUserById(token.sub);
        if (existingUser) {
          token.role = existingUser.role;
        }
      }

      return token;
    },
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
