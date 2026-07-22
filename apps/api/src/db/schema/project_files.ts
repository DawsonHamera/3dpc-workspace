import {
    integer,
    pgEnum,
    pgTable,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { relations } from "drizzle-orm/relations";
import { files } from "./files";

export const projectFiles = pgTable("project_files", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    projectId: uuid("project_id")
        .notNull()
        .references(() => projects.id, {
            onDelete: "cascade",
        }),

    fileId: uuid("file_id")
        .notNull()
        .references(() => files.id, {
            onDelete: "cascade",
        }),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

});

export const projectFilesRelations = relations(
  projectFiles,
  ({ one }) => ({
    file: one(files, {
      fields: [projectFiles.fileId],
      references: [files.id],
    }),

    project: one(projects, {
      fields: [projectFiles.projectId],
      references: [projects.id],
    }),
  })
);

export type ProjectFile = typeof projectFiles.$inferSelect;