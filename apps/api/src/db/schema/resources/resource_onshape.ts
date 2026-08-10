import {
    pgTable,
    text,
    uuid,
} from "drizzle-orm/pg-core";

import { resources } from "./resources";
import { relations } from "drizzle-orm/relations";

export const resourceOnshape = pgTable(
    "resource_onshape",
    {
        resourceId: uuid("resource_id")
            .primaryKey()
            .references(() => resources.id, {
                onDelete: "cascade",
            }),

        documentId: text("document_id")
            .notNull()
            .unique(),
    }
);

export const resourceOnshapeRelations = relations(
    resourceOnshape,
    ({ one }) => ({
        resource: one(resources, {
            fields: [resourceOnshape.resourceId],
            references: [resources.id],
        }),
    })
);