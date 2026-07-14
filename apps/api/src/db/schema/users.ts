import {
  integer,
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

  name: text("name"),

  roleId: integer("role_id")
    .notNull()
    .references(() => roles.id),

  passwordHash: text("password_hash"),

  createdAt: timestamp("created_at")
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow(),
});