import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { category, comment, postTag, user } from "@/server/db/schema";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const post = pgTable("post", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  title: varchar("title", { length: 255 }).notNull(),
  shortDescription: text("short_description"),
  content: text("content").notNull(),
  categoryId: text("category_id")
    .references(() => category.id)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const postRelations = relations(post, ({ one, many }) => ({
  user: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
  tags: many(postTag),
  comments: many(comment),
  category: one(category, {
    fields: [post.categoryId],
    references: [category.id],
  }),
}));

const baseSchema = createInsertSchema(post, {
  title: (schema) => schema.title.min(1),
  shortDescription: (schema) => schema.shortDescription.min(1).max(255),
  userId: (schema) => schema.userId.min(1),
  categoryId: (schema) => schema.categoryId.min(1),
}).pick({
  title: true,
  shortDescription: true,
  userId: true,
  categoryId: true,
  content: true,
});

export const postSchema = z.union([
  z.object({
    mode: z.literal("create"),
    title: baseSchema.shape.title,
    shortDescription: baseSchema.shape.shortDescription,
    userId: baseSchema.shape.userId,
    categoryId: baseSchema.shape.categoryId,
    content: baseSchema.shape.content,
    tagIds: z.array(z.number()),
  }),
  z.object({
    mode: z.literal("edit"),
    id: z.number().min(1),
    title: baseSchema.shape.title,
    shortDescription: baseSchema.shape.shortDescription,
    userId: baseSchema.shape.userId,
    categoryId: baseSchema.shape.categoryId,
    content: baseSchema.shape.content,
    tagIds: z.array(z.number()),
  }),
]);

export type PostSchema = z.infer<typeof postSchema>;
export type Post = InferSelectModel<typeof post>;
