"use server";
import { createSafeActionClient } from "next-safe-action";
import { LoginSchema, RegisterSchema } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { db } from "../db";
import { user } from "../db/schema";

const actionClient = createSafeActionClient();

/***************SOCIAL SIGN IN ***********************************************/
export const socialSignIn = async ({
  social,
  callback,
}: {
  social: string;
  callback: string;
}) => {
  await signIn(social, { redirectTo: callback });
};

/***************REGISTER USER***********************************************/
export const registerUser = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    const userExist = await db.query.user.findFirst({
      where: eq(user.email, email),
    });
    if (userExist) {
      return {
        error: "Email already in use, please use different email address",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(user).values({
      email,
      name,
      password: hashedPassword,
    });

    return { success: "User registered successfully, please Login" };
  });

/***************EMAIL SIGN IN ***********************************************/
export const emailSignIn = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const existingUser = await db.query.user.findFirst({
        where: eq(user.email, email),
      });

      if (!existingUser || existingUser.email !== email) {
        return { error: "Email not found!" };
      }

      // if (!existingUser.emailVerified) {
      //   const verificationToken = await generateEmailVerificationToken(email);
      //   await sendVerificationEmail(
      //     verificationToken[0].email,
      //     verificationToken[0].token
      //   );
      //   return { success: "Confirmation Email sent" };
      // }

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return { success: "Successfully LoggedIn" };
    } catch (error) {
      console.log(error);

      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid Credentials" };
          case "AccessDenied":
            return { error: error.message };
          case "OAuthSignInError":
            return { error: error.message };
          default:
            return { error: "Something went wrong!" };
        }
      }
    }
  });
