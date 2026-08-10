import {
    pgTable,
    primaryKey,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

import { projects } from "./projects";
import { resources } from "../resources/resources";
import { relations } from "drizzle-orm";

export const projectResources = pgTable(
    "project_resources",
    {
        projectId: uuid("project_id")
            .notNull()
            .references(() => projects.id, {
                onDelete: "cascade",
            }),

        resourceId: uuid("resource_id")
            .notNull()
            .references(() => resources.id, {
                onDelete: "cascade",
            }),

        addedAt: timestamp("added_at")
            .notNull()
            .defaultNow(),
    },
    (table) => [
        primaryKey({
            columns: [
                table.projectId,
                table.resourceId,
            ],
        }),
    ]
);

export const projectResourcesRelations = relations(
    projectResources,
    ({ one }) => ({
        project: one(projects, {
            fields: [projectResources.projectId],
            references: [projects.id],
        }),

        resource: one(resources, {
            fields: [projectResources.resourceId],
            references: [resources.id],
        }),
    })
);