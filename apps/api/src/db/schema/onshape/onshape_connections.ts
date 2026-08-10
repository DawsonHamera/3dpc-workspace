import {
    pgTable,
    text,
    timestamp,
    unique,
    uuid,
} from "drizzle-orm/pg-core";
import { users } from "../users/users";

export const onshapeConnections = pgTable("onshape_connections", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, {
            onDelete: "cascade",
        }),

    onshapeUserId: text("onshape_user_id").notNull(),

    accessToken: text("access_token").notNull(),
    refreshToken: text("refresh_token"),

    expiresAt: timestamp("expires_at", {
        withTimezone: true,
    }),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),

}, (table) => [
    unique("onshape_connections_user_id_unique").on(table.userId),
    unique("onshape_connections_onshape_user_id_unique").on(
        table.onshapeUserId
    ),
]);