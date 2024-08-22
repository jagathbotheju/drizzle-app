import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/lib/schema";
import { compare } from "bcryptjs";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { user } from "@/server/db/schema";
import { User } from "@/server/db/schema/user";

export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) {
        // console.log("auth user******");

        const validated = LoginSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;
        const existUser = await db.query.user.findFirst({
          where: eq(user.email, email),
        });

        if (!existUser || !existUser.password) return null;
        const matchPassword = compare(password, existUser.password);
        if (!matchPassword) return null;

        // console.log("auth user******", existUser);
        return existUser as User;
      },
    }),
  ],
} satisfies NextAuthConfig;
