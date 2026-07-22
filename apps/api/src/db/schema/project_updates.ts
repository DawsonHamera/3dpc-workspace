import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { users } from "./users";
import { relations } from "drizzle-orm/relations";

export const projectUpdates = pgTable("project_updates", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, {
      onDelete: "cascade",
    }),

  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id),

  title: text("title"),

  content: text("content")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const projectUpdatesRelations = relations(
  projectUpdates,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectUpdates.projectId],
      references: [projects.id],
    }),
    author: one(users, {
      fields: [projectUpdates.authorId],
      references: [users.id],
    }),
  })
);

export type ProjectUpdate = typeof projectUpdates.$inferSelect;