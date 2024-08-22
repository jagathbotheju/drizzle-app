"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { category, post } from "../db/schema";
import { Category } from "../db/schema/category";
import { Post } from "../db/schema/post";

export const getCategoryById = async (categoryId: string) => {
  const selectedCategory = await db
    .select()
    .from(category)
    .where(eq(category.id, categoryId))
    .then((res) => res[0]);
  return selectedCategory as Category;
};

export const getPostsByCategoryId = async (
  page: number,
  limit: number,
  categoryId: string
) => {
  const posts = await db
    .select({
      id: post.id,
      title: post.title,
      shortDescription: post.shortDescription,
      updatedAt: post.updatedAt,
    })
    .from(post)
    .offset(page * limit)
    .limit(limit)
    .where(eq(post.categoryId, categoryId))
    .orderBy(desc(post.createdAt));

  return posts as Post[];
};
