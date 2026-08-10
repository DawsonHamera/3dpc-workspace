import {
    pgTable,
    uuid,
} from "drizzle-orm/pg-core";

import { resources } from "./resources";
import { files } from "../files";
import { relations } from "drizzle-orm/relations";

export const resourceFiles = pgTable(
    "resource_files",
    {
        resourceId: uuid("resource_id")
            .primaryKey()
            .references(() => resources.id, {
                onDelete: "cascade",
            }),

        fileId: uuid("file_id")
            .notNull()
            .unique()
            .references(() => files.id, {
                onDelete: "cascade",
            }),
    }
);

export const resourceFilesRelations = relations(
    resourceFiles,
    ({ one }) => ({
        resource: one(resources, {
            fields: [resourceFiles.resourceId],
            references: [resources.id],
        }),
        file: one(files, {
            fields: [resourceFiles.fileId],
            references: [files.id],
        }),
    })
);