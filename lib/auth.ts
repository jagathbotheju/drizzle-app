import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/server/db";
import { LoginSchema } from "./schema";
import { user } from "@/server/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  debug: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),

    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),

    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields || !validatedFields.data) return null;

        const { email, password } = validatedFields.data;
        const existUser = await db.query.user.findFirst({
          where: eq(user.email, email),
        });
        if (!existUser || !existUser.password) return null;

        const passwordMatch = await bcrypt.compare(
          password,
          existUser.password
        );
        if (passwordMatch) return existUser;

        return null;
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile }) {
    //   console.log("next auth user******", user);
    //   return true;
    // },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        // const userDB = await db.query.user.findFirst({
        //   where: eq(user, token.sub),
        // });

        // if (userDB) {
        //   session.user = userDB;
        // } else {
        //   session.user.id = token.sub;
        // }
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      // console.log("jwt", token);
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && session) {
        token = { ...token, user: session };
        return token;
      }
      return token;
    },
  },
});
