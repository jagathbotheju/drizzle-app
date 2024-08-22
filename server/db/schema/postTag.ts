import { relations } from "drizzle-orm";
import { text, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { post, tag } from "@/server/db/schema";

export const postTag = pgTable(
  "post_to_tag",
  {
    postId: text("post_id")
      .notNull()
      .references(() => post.id),
    tagId: text("tag_id")
      .notNull()
      .references(() => tag.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.tagId] }),
  })
);

export const postTagsRelations = relations(postTag, ({ one }) => ({
  tag: one(tag, { fields: [postTag.tagId], references: [tag.id] }),
  post: one(post, { fields: [postTag.postId], references: [post.id] }),
}));

const postTagsSchema = createInsertSchema(postTag);
export type PostTagsSchema = z.infer<typeof postTagsSchema>;
