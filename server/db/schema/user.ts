import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { post } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("full_name", { length: 255 }).notNull(),
  password: text("password"),
  image: text("image"),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  posts: many(post),
}));

const baseSchema = createInsertSchema(user, {
  name: (schema) => schema.name.min(1),
  password: (schema) => schema.password.min(1),
  email: (schema) => schema.email.email(),
}).pick({ name: true, password: true, email: true });

export const userSchema = z.union([
  z.object({
    mode: z.literal("signUp"),
    email: baseSchema.shape.email,
    password: baseSchema.shape.password,
    name: baseSchema.shape.name,
  }),
  z.object({
    mode: z.literal("signIn"),
    email: baseSchema.shape.email,
    password: baseSchema.shape.password,
  }),
  z.object({
    mode: z.literal("update"),
    name: baseSchema.shape.name,
  }),
]);

export type UserSchema = z.infer<typeof userSchema>;
export type User = InferSelectModel<typeof user>;
