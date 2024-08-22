"use server";

import { count, desc, ilike, eq } from "drizzle-orm";
import { db } from "../db";
import { post } from "../db/schema";
import { Post } from "../db/schema/post";

export const getUserPosts = async ({
  limit,
  page,
  userId,
}: {
  limit: number;
  page: number;
  userId: string;
}) => {
  const userPosts = (await db.query.post.findMany({
    limit,
    where: eq(post.userId, userId),
    offset: limit * page,
    orderBy: [desc(post.createdAt)],
  })) as Post[];
  return userPosts;
};

export const getUserPostsCount = async (userId: string) => {
  const userPostsCount = await db
    .select({ count: count() })
    .from(post)
    .where(eq(post.userId, userId))
    .then((res) => res[0]);
  return userPostsCount;
};

export const getRelatedPostsByCategoryId = async (categoryId?: string) => {
  if (!categoryId) return null;
  const relatedPosts = (await db.query.post.findMany({
    limit: 4,
    where: eq(post.categoryId, categoryId),
    columns: {
      id: true,
      title: true,
      updatedAt: true,
      shortDescription: true,
    },
  })) as Post[];
  return relatedPosts;
};

export const getPostById = async (postId: string) => {
  const selectedPost = await db.query.post.findFirst({
    where: eq(post.id, postId),
    with: {
      category: true,
      user: {
        columns: { id: true, name: true, email: true },
      },
      comments: {
        with: {
          user: true,
        },
      },
    },
  });
  return selectedPost;
};

export const getPostsCount = async (searchTerm?: string) => {
  const posts = await db
    .select({ count: count() })
    .from(post)
    .where(ilike(post.title, `%${searchTerm || ""}%`))
    .then((res) => res[0].count);
  return posts;
};

export const getPosts = async ({
  page,
  limit,
  searchTerm,
}: {
  page: number;
  limit: number;
  searchTerm?: string;
}) => {
  const posts = (await db
    .select()
    .from(post)
    .orderBy(desc(post.createdAt))
    .limit(limit)
    .offset(page * limit)
    .where(ilike(post.title, `%${searchTerm || ""}%`))) as Post[];
  return posts;
};

export const getAllPosts = async () => {
  const posts = (await db.query.post.findMany()) as Post[];
  return posts;
};
