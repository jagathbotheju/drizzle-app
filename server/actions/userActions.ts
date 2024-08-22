"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { user } from "../db/schema";
import { User } from "../db/schema/user";

export const getUserById = async (userId: string) => {
  const selectedUser = (await db.query.user.findFirst({
    where: eq(user.id, userId),
  })) as User;
  return selectedUser;
};
