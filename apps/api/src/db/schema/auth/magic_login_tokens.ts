import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "../users/users";

export const magicLoginTokens = pgTable("magic_login_tokens", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, {
            onDelete: "cascade",
        }),

    tokenHash: text("token_hash")
        .notNull()
        .unique(),

    expiresAt: timestamp("expires_at", {
        withTimezone: true,
    }).notNull(),

    usedAt: timestamp("used_at", {
        withTimezone: true,
    }),

    createdAt: timestamp("created_at", {
        withTimezone: true,
    })
        .defaultNow()
        .notNull(),
});