import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";
import { roles } from "../src/db/schema";

const client = neon(process.env.DATABASE_URL!);
const db = drizzle(client);


// Clear existing data and reset identity columns (seperate this later)
await db.execute(sql`
  TRUNCATE TABLE
    sessions,
    users,
    roles
  RESTART IDENTITY CASCADE;
`);

await db.insert(roles).values([
  {
    id: 1,
    name: "Owner",
    description: "Full system access",
  },
  {
    id: 2,
    name: "Admin",
    description: "Club administrators",
  },
  {
    id: 4,
    name: "Member",
    description: "Standard club member",
  },
]);