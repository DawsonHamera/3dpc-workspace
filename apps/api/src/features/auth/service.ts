import { eq } from "drizzle-orm";
import { createSessionToken, hashToken } from "../../lib/crypto";
import type { Db } from "../../types";
import { sessions, users } from "../../db/schema";
import { AppError } from "../../lib/errors";

export const createSession = async (
  db: Db,
  userId: string
) => {
  const token = await createSessionToken();

  const tokenHash = await hashToken(token);


  await db.insert(sessions).values({
    userId,
    tokenHash,
    expiresAt: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 30
    ),
  });


  return token;
}


export const getSession = async (
  db: Db,
  token: string
) => {
  const tokenHash = await hashToken(token);


  return db.query.sessions.findFirst({
    where: eq(
      sessions.tokenHash,
      tokenHash
    ),
    with: {
      user: {
        with: {
          role: true,
        },
      },
    },
  });
}

export const deleteSession = async (
  db: Db,
  token: string
) => {
  const tokenHash = await hashToken(token);
  await db.delete(sessions).where(eq(sessions.tokenHash, tokenHash));
}

export const verifyUser = async (
  db: Db,
  email: string,
  password: string
) => {

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return null;
  }

  const isMatch = await hashToken(password) === user.passwordHash;

  if (!isMatch) {
    return null;
  }

  return user.id;
}

export const registerUser = async (
  db: Db,
  data: {
    email: string;
    name: string;
    password: string;
    grade?: string;
  }
) => {

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });

  if (existingUser) {
    if (existingUser) {
      throw new AppError(
        409,
        "EMAIL_EXISTS",
        "Email is already registered"
      );
    }
  }

  const passwordHash = await hashToken(data.password);

  const result = await db.insert(users).values({
    email: data.email,
    name: data.name,
    passwordHash,
    meta: data.grade ? { grade: data.grade } : {},
  }).returning({ id: users.id });

  return result[0]?.id || null;
}