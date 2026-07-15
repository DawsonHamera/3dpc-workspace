import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { roles } from "./roles";


export const users = pgTable("users", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  email: text("email")
    .notNull()
    .unique(),

  name: text("name")
    .notNull(),

  roleId: integer("role_id")
    .notNull()
    .references(() => roles.id)
    .default(5),

  passwordHash: text("password_hash"),

  meta: jsonb("meta").default({}),

  createdAt: timestamp("created_at")
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow(),
});

export type User = typeof users.$inferSelect;