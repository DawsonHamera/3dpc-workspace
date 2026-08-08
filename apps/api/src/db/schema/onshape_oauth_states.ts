import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const onshapeOAuthStates = pgTable(
    "onshape_oauth_states",
    {
        id: uuid("id")
            .defaultRandom()
            .primaryKey(),

        state: text("state")
            .notNull()
            .unique(),

        userId: uuid("user_id")
            .notNull()
            .references(
                () => users.id,
                {
                    onDelete: "cascade",
                }
            ),

        expiresAt: timestamp("expires_at", {
            withTimezone: true,
        }).notNull(),

        createdAt: timestamp("created_at")
            .notNull()
            .defaultNow(),

        updatedAt: timestamp("updated_at")
            .notNull()
            .defaultNow(),
    }
);