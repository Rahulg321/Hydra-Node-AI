import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import db from "@/lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: UserRole;
      isTwoFactorEnabled: boolean;
      isCredentialsLogin: boolean;
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
        // signing using google
        return true;
      }

      const existingUser = await getUserById(user.id as string);

      // prevent signin without email verification
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      // adding 2 FA Check
      if (existingUser.isTwoFactorEnabled) {
        const confirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        console.log("two factor confirmation", { confirmation });

        if (!confirmation) {
          return false;
        }

        // users will do a 2FA Check everytime they login
        await db.twoFactorConfirmation.delete({
          where: {
            id: confirmation.id,
          },
        });
      }

      return true;
    },

    async jwt({ token, user, account }) {
      // If this is the first time the token is created, set the `sub` and other properties
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.id = existingUser.id;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      // Check if the user logged in with credentials or OAuth
      token.isCredentialsLogin = !!existingUser.password;

      return token;
    },
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.isTwoFactorEnabled && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isCredentialsLogin = token.isCredentialsLogin as boolean;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
