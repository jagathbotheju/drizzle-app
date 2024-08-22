import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { post } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const category = pgTable("category", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  posts: many(post),
}));

export const categorySchema = createInsertSchema(category);
export type Category = z.infer<typeof categorySchema>;
