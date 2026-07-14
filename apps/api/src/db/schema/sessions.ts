import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./users";


export const sessions = pgTable("sessions", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  tokenHash: text("token_hash")
    .notNull()
    .unique(),

  ipAddress: text("ip_address"),

  userAgent: text("user_agent"),

  expiresAt: timestamp("expires_at", {
    withTimezone: true,
  }).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true })
    .defaultNow()
    .notNull(),

  lastUsedAt: timestamp("last_used_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});