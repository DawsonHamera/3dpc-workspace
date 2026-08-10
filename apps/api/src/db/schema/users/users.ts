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
import { files } from "../files";
import { sessions } from "./sessions";
import { relations } from "drizzle-orm/relations";


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

export const usersRelations = relations(
  users,
  ({ one, many }) => ({
    role: one(roles, {
      fields: [users.roleId],
      references: [roles.id],
    }),

    sessions: many(sessions),

    avatar: one(files, {
      fields: [users.avatarFileId],
      references: [files.id],
    }),
  })
);


export type User = typeof users.$inferSelect;