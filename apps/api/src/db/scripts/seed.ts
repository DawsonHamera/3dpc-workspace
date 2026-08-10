import "dotenv/config";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";

import {
  roles,
  users,
  projects,
  projectMembers,
  resources,
  projectResources,
  resourceFiles,
  resourceOnshape,
} from "../schema";
import { hashPassword } from "../../services/password";

const client = neon(process.env.DATABASE_URL!);
const db = drizzle(client);


// --------------------------------------------------
// Clear existing data
// --------------------------------------------------

await db.execute(sql`
    TRUNCATE TABLE
        resource_onshape,
        resource_files,
        project_resources,
        resources,
        project_members,
        projects,
        sessions,
        users,
        roles
    RESTART IDENTITY CASCADE;
`);


// --------------------------------------------------
// Roles
// --------------------------------------------------

await db.insert(roles).values([
  {
    id: 1,
    name: "owner",
    description: "Full system access",
  },
  {
    id: 2,
    name: "admin",
    description: "Club administrators",
  },
  {
    id: 3,
    name: "moderator",
    description: "Club moderators",
  },
  {
    id: 4,
    name: "member",
    description: "Standard club member",
  },
  {
    id: 5,
    name: "guest",
    description: "Limited access for guests",
  },
]);


// --------------------------------------------------
// Users
// --------------------------------------------------
const devPasswordHash = await hashPassword("password");

const [owner] = await db
  .insert(users)
  .values({
    email: "owner@3dpc.local",
    name: "Dev Owner",
    passwordHash: devPasswordHash,
    roleId: 1,
  })
  .returning();

const [admin] = await db
  .insert(users)
  .values({
    email: "admin@3dpc.local",
    name: "Dev Admin",
    passwordHash: devPasswordHash,
    roleId: 2,
  })
  .returning();

const [member] = await db
  .insert(users)
  .values({
    email: "member@3dpc.local",
    name: "Dev Member",
    passwordHash: devPasswordHash,
    roleId: 4,
  })
  .returning();


// --------------------------------------------------
// Projects
// --------------------------------------------------

const [robotics] = await db
  .insert(projects)
  .values({
    name: "Robotics",
    slug: "robotics",
    description: "Robotics development project",
    shortDescription: "Robotics development project",
    visibility: "private",
  })
  .returning();

const [workshop] = await db
  .insert(projects)
  .values({
    name: "Workshop",
    slug: "workshop",
    description: "General 3D printing and workshop resources",
    shortDescription: "General 3D printing and workshop resources",
    visibility: "public",
  })
  .returning();


// --------------------------------------------------
// Project Members
// --------------------------------------------------

await db.insert(projectMembers).values([
  {
    projectId: robotics.id,
    userId: owner.id,
    role: "owner",
  },
  {
    projectId: robotics.id,
    userId: admin.id,
    role: "lead",
  },
  {
    projectId: robotics.id,
    userId: member.id,
    role: "contributor",
  },

  {
    projectId: workshop.id,
    userId: owner.id,
    role: "owner",
  },
  {
    projectId: workshop.id,
    userId: admin.id,
    role: "lead",
  },
  {
    projectId: workshop.id,
    userId: member.id,
    role: "contributor",
  },
]);


// --------------------------------------------------
// Resources
// --------------------------------------------------

const [robotArm] = await db
  .insert(resources)
  .values({
    name: "Robot Arm Assembly",
    type: "onshape",
    createdBy: owner.id,
  })
  .returning();

const [printerGuide] = await db
  .insert(resources)
  .values({
    name: "3D Printer Guide",
    type: "file",
    createdBy: admin.id,
  })
  .returning();


// --------------------------------------------------
// Resource → Project
// --------------------------------------------------

await db.insert(projectResources).values([
  {
    resourceId: robotArm.id,
    projectId: robotics.id,
  },
  {
    // Same resource reused by another project.
    resourceId: robotArm.id,
    projectId: workshop.id,
  },
  {
    resourceId: printerGuide.id,
    projectId: workshop.id,
  },
]);


// --------------------------------------------------
// Onshape resource
// --------------------------------------------------

await db.insert(resourceOnshape).values({
  resourceId: robotArm.id,
  documentId: "dev-onshape-document",
});


// --------------------------------------------------
// Done
// --------------------------------------------------

console.log("Development database seeded.");