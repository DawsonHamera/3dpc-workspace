import {
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm/relations";



export const auditLogs = pgTable("audit_logs", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  userId: uuid("user_id")
        .references(() => users.id),

  action: text("action").notNull(),

  resourceType: text("resource_type"),
  resourceId: text("resource_id"),

  description: text("description"),

  metadata: jsonb("metadata"),

  createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),
});

export const auditLogsRelations = relations(
  auditLogs,
  ({ one }) => ({
    user: one(users, {
      fields: [auditLogs.userId],
      references: [users.id],
    }),
  })
);

export type AuditLog = typeof auditLogs.$inferSelect;