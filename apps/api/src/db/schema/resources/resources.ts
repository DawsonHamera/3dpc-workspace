import {
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

import { users } from "../users/users";
import { projectResources, resourceFiles, resourceOnshape } from "../../schema";
import { relations } from "drizzle-orm";

export const resourceTypeEnum = pgEnum(
    "resource_type",
    [
        "file",
        "onshape",
    ]
);

export const resources = pgTable(
    "resources",
    {
        id: uuid("id")
            .defaultRandom()
            .primaryKey(),

        createdBy: uuid("created_by")
            .notNull()
            .references(() => users.id),

        type: resourceTypeEnum("type")
            .notNull(),

        name: text("name")
            .notNull(),

        createdAt: timestamp("created_at")
            .notNull()
            .defaultNow(),

        updatedAt: timestamp("updated_at")
            .notNull()
            .defaultNow(),
    }
);

export const resourcesRelations = relations(
    resources,
    ({ many, one }) => ({
        projects: many(projectResources),

        onshape: one(resourceOnshape, {
            fields: [resources.id],
            references: [resourceOnshape.resourceId],
        }),

        file: one(resourceFiles, {
            fields: [resources.id],
            references: [resourceFiles.resourceId],
        }),
    })
);

export type CreateResource = typeof resources.$inferInsert;