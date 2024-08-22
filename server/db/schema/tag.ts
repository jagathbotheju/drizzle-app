import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { postTag } from "@/server/db/schema";

export const tag = pgTable("tag", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export const tagRelations = relations(tag, ({ many }) => ({
  postToTag: many(postTag),
}));

const tagSchema = createInsertSchema(tag);
export type TagSchema = z.infer<typeof tagSchema>;
