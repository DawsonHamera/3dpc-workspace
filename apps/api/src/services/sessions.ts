import { eq } from "drizzle-orm";

import { sessions } from "../db/schema";
import { createSessionToken, hashToken } from "../lib/crypto";
import type { Db } from "../types";


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