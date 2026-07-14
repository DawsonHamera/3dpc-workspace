import {
  integer,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: integer("id")
    .primaryKey(),

  name: text("name")
    .notNull()
    .unique(),

  description: text("description"),
});