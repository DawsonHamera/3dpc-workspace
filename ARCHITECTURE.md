# 3DPC Workspace Architecture

## Overview

3DPC Workspace is the digital platform for the 3DPC club.

The goal is to provide a central system for club operations including:

- Member management
- Authentication
- Roles and permissions
- Events
- Projects
- Files/resources
- Future club tools

The application is designed to be:

- Low maintenance
- Free to operate
- Easy for future students to inherit
- Scalable beyond initial club needs

---

# Current Stack

## Frontend

**React + Vite + TypeScript**

Purpose:

- User interface
- Client-side application logic
- API communication

Deployment:

```
Cloudflare Pages
```

Current deployment:

```
https://3dpc-workspace-web.pages.dev
```

---

## Backend

**Hono + Cloudflare Workers**

Purpose:

- API routes
- Authentication
- Business logic
- Database access

Deployment:

```
Cloudflare Workers
```

Architecture:

```
React
 |
 | HTTP requests
 |
 v
Hono API
 |
 v
Drizzle ORM
 |
 v
Neon PostgreSQL
```

---

## Database

**Neon PostgreSQL**

Purpose:

- Persistent application data
- Users
- Sessions
- Roles
- Club information

ORM:

```
Drizzle ORM
```

---

# Repository Structure

Current monorepo layout:

```
3dpc-workspace/

├── apps/
│
│   ├── web/
│   │   ├── React frontend
│   │   └── Vite configuration
│   │
│   └── api/
│       ├── Hono Worker
│       ├── Drizzle schema
│       └── API routes
│
├── packages/
│   └── Shared code/types (future)
│
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

# Development

## Requirements

Install:

- Node.js
- pnpm

Recommended:

```
Node.js 22+
pnpm 10+
```

---

## Install Dependencies

From repository root:

```bash
pnpm install
```

---

## Run Development

Frontend:

```bash
pnpm --filter web dev
```

Backend:

```bash
pnpm --filter api dev
```

---

# Frontend

## React API Communication

Development uses a Vite proxy.

The frontend communicates through:

```
/api/*
```

Example:

```
Browser:

GET /api/users

↓

Vite proxy

↓

Hono:

GET /users
```

The `/api` prefix exists to separate frontend API calls from other routes.

Example Vite configuration:

```ts
server: {
  proxy: {
    "/api": {
      target: env.VITE_API_URL,
      changeOrigin: true,
      rewrite: (path) =>
        path.replace(/^\/api/, ""),
    },
  },
}
```

---

# Backend

## Hono Structure

Example:

```
src/

├── index.ts
│
├── routes/
│   ├── users.ts
│   └── login.ts
│
├── middleware/
│   ├── auth.ts
│   ├── role.ts
│   └── db.ts
│
├── db/
│   └── schema/
│
└── services/
```

---

# Authentication

Authentication uses:

```
Database Sessions + HttpOnly Cookies
```

The application does not store authentication tokens in localStorage.

Benefits:

- Browser manages cookies automatically
- Sessions can be revoked immediately
- No JWT refresh logic
- Reduced frontend security responsibility

---

## Login Flow

```
User enters credentials

        |
        v

Server validates password

        |
        v

Create session record

        |
        v

Set HttpOnly cookie

        |
        v

Browser sends cookie automatically

        |
        v

Auth middleware loads user
```

---

# Session System

Sessions are stored in the database.

Example:

```
sessions

id
userId
tokenHash
ipAddress
userAgent
expiresAt
createdAt
lastUsedAt
```

Deleting a session invalidates access immediately.

---

# Authorization

The application uses role-based access control.

Current roles:

```
Owner
Admin
Officer
Member
```

Example:

```
Owner
 └── Full system access

Admin
 └── User management

Officer
 └── Club operations

Member
 └── Normal access
```

---

# Database

## Drizzle Structure

Database schema is separated into files:

```
db/schema/

├── users.ts
├── roles.ts
├── sessions.ts
├── relations.ts
└── index.ts
```

---

## Core Tables

## users

Stores:

- Account information
- User profile
- Role assignment

---

## roles

Stores:

- Permission groups

Example:

```
1 Owner
2 Admin
3 Officer
4 Member
```

---

## sessions

Stores:

- Active login sessions
- Expiration information
- Security metadata

---

# Drizzle Types

Database schemas are the source of truth.

Example:

```ts
export const users = pgTable(...)
```

Types are automatically inferred:

```ts
export type User =
  typeof users.$inferSelect;

export type NewUser =
  typeof users.$inferInsert;
```

Avoid manually duplicating database interfaces.

---

# Database Commands

Push schema changes:

```bash
pnpm drizzle-kit push
```

Generate migrations:

```bash
pnpm drizzle-kit generate
```

Open database viewer:

```bash
pnpm drizzle-kit studio
```

---

# Seeding

Seed scripts populate required data.

Example:

Roles:

```
Owner
Admin
Officer
Member
```

A fresh database should always be seeded with required lookup data.

---

# Deployment

## Frontend

Deployment flow:

```
Git push

↓

Cloudflare Build

↓

Cloudflare Pages deployment
```

---

## Backend

Deploy Worker:

```bash
wrangler deploy
```

---

# Domain Strategy

Current strategy:

Use Cloudflare provided domains.

Example:

```
3dpc-workspace-web.pages.dev
```

No paid domain dependency.

---

## Future Custom Domain

Migration path:

```
app.example.com

        |

        v

Cloudflare Pages
```

and:

```
api.example.com

        |

        v

Cloudflare Worker
```

No application changes required.

---

# Design Principles

## Keep Infrastructure Free

Current services:

| Service | Purpose |
|---|---|
| Cloudflare Pages | Frontend hosting |
| Cloudflare Workers | API hosting |
| Neon | PostgreSQL database |
| GitHub | Source control |

---

## Avoid Unnecessary Complexity

The project intentionally avoids:

- Microservices
- Self-hosted servers
- Expensive infrastructure
- Over-engineering

---

# Future Development

Potential features:

- Event management
- Attendance tracking
- Project boards
- File management
- Notifications
- Public club website
- Advanced permissions

---

# Ownership Transfer Checklist

When transferring the project:

1. Transfer GitHub repository access
2. Transfer Cloudflare access
3. Transfer Neon database access
4. Document environment variables
5. Explain deployment commands
6. Keep documentation updated

---

# Final Architecture

```
                 Users
                   |
                   v

            Cloudflare Pages
                   |
                   v

             React + Vite
                   |
                   v

            Hono Worker
                   |
                   v

             Drizzle ORM
                   |
                   v

          Neon PostgreSQL


Authentication:

Browser Cookie

      |

      v

Session Table

      |

      v

User + Role
```

3DPC Workspace is designed to be simple enough for students to maintain while still using modern production architecture.