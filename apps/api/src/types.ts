import type { createDb } from "./db";
import { UserWithRole } from "./features/users/service";

export type Db = ReturnType<typeof createDb>;


// Old?
export type UserContext = {
  id: string;
  email: string;
  roleId: number;
  role: string;
};

export type Variables = {
  db: Db;
  user: UserWithRole | null;
};

export type Env = {
  Bindings: Record<string, unknown>;
  Variables: Variables;
};