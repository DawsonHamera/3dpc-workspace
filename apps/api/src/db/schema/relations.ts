import { relations } from "drizzle-orm";

import { users } from "./users";
import { roles } from "./roles";
import { sessions } from "./sessions";


export const usersRelations = relations(
  users,
  ({ one, many }) => ({
    role: one(roles, {
      fields: [users.roleId],
      references: [roles.id],
    }),

    sessions: many(sessions),
  })
);


export const rolesRelations = relations(
  roles,
  ({ many }) => ({
    users: many(users),
  })
);


export const sessionsRelations = relations(
  sessions,
  ({ one }) => ({
    user: one(users, {
      fields: [sessions.userId],
      references: [users.id],
    }),
  })
);