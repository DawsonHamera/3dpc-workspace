import {
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { projectFiles } from "./project_files";
import { relations } from "drizzle-orm/relations";
import { projectMembers } from "./project_members";

export const projects = pgTable("projects", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    name: text("name")
        .notNull(),

    slug: text("slug")
        .notNull()
        .unique(),

    description: text("description"),

    shortDescription: text("short_description"),

    status: text("status")
        .notNull()
        .default("active"),

    visibility: text("visibility")
        .notNull()
        .default("public"),
    
    isFeatured: integer("is_featured")
        .notNull()
        .default(0),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
});

export const projectsRelations = relations(
    projects,
    ({ many }) => ({
        members: many(projectMembers),

        files: many(projectFiles),
    })
);

export type Project = typeof projects.$inferSelect;