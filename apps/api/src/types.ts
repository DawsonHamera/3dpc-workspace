import type { createDb } from "./db";

export type Db = ReturnType<typeof createDb>;

export type UserContext = {
  id: string;
  email: string;
  roleId: number;
  role: string;
};

export type Variables = {
  db: Db;
  user: UserContext;
};