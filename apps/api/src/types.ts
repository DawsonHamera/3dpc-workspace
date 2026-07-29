import type { createDb } from "./db";
import { auditLogger } from "./services/auditLog";
import { R2Storage } from "./services/storage";

export type Db = ReturnType<typeof createDb>;


// Old?
export type UserContext = {
  id: string;
  email: string;
  roleId: number;
  role: string;
};

export type ServicesContext = {
  db: Db;
  storage: R2Storage;
  audit: ReturnType<typeof auditLogger>;
};

export type Bindings = {
  FILES: R2Bucket;
};

export type Variables = {
  db: Db;
  services: {
    db: Db;
    storage: R2Storage;
    audit: ReturnType<typeof auditLogger>;
  };
  user: UserContext | null;
  projectMembership: string | null;
  BCRYPT_ROUNDS: number;
};

export type Env = {
  Bindings: Bindings;
  Variables: Variables;
};