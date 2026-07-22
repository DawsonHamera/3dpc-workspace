import {
    integer,
    pgEnum,
    pgTable,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";
import { relations } from "drizzle-orm/relations";

export const ProjectRole = pgEnum("project_role", [
    "owner",
    "lead",
    "contributor",
    "viewer"
]);

export const projectMembers = pgTable("project_members", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    projectId: uuid("project_id")
        .notNull()
        .references(() => projects.id, {
            onDelete: "cascade",
        }),

    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, {
            onDelete: "cascade",
        }),

    role: ProjectRole("role")
        .notNull()
        .default("contributor"),

    joinedAt: timestamp("joined_at")
        .notNull()
        .defaultNow(),

});

export const projectMembersRelations = relations(
  projectMembers,
  ({ one }) => ({
    user: one(users, {
      fields: [projectMembers.userId],
      references: [users.id],
    }),

    project: one(projects, {
      fields: [projectMembers.projectId],
      references: [projects.id],
    }),
  })
);

export type ProjectMember = typeof projectMembers.$inferSelect;