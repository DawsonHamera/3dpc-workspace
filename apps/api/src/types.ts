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

export type Bindings = {
  FILES: R2Bucket;
};

export type Variables = {
  db: Db;
  user: UserContext | null;
};

export type Env = {
  Bindings: Bindings;
  Variables: Variables;
};