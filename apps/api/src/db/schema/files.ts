import {
    pgTable,
    uuid,
    text,
    integer,
    timestamp,
    pgEnum,
    jsonb,
} from "drizzle-orm/pg-core";
import { users } from "./users";


export const fileTypeEnum = pgEnum("file_type", [
    "image",
    "model",
    "document",
    "video",
    "other",
]);


export const files = pgTable("files", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    key: text("key")
        .notNull()
        .unique(),


    originalName: text("original_name")
        .notNull(),


    mimeType: text("mime_type")
        .notNull(),


    size: integer("size")
        .notNull(),


    type: fileTypeEnum("type")
        .notNull(),

    metadata: jsonb("metadata"),

    uploadedBy: uuid("uploaded_by")
        .notNull()
        .references(() => users.id),


    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),
});