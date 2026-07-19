import {
  AnyPgColumn,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { roles } from "./roles";
import { files } from "./files";


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

  avatarFileId: uuid("avatar_file_id")
    .references((): AnyPgColumn => files.id),

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