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
  ONSHAPE_CLIENT_ID: string;
  ONSHAPE_CLIENT_SECRET: string;
  ONSHAPE_REDIRECT_URI: string;
  BCRYPT_ROUNDS: number;
  FRONTEND_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REFRESH_TOKEN: string;
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
};

export type Env = {
  Bindings: Bindings;
  Variables: Variables;
};