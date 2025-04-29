import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import { LoginFormZodType } from "./hooks/lib/schemas/LoginFormSchema";

export default {
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginFormZodType.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (isPasswordValid) {
            return user;
          }
        }

        console.log("invalid credentials");

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
