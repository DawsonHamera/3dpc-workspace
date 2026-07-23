import { eq } from "drizzle-orm";
import { users } from "../../db/schema";
import { Db } from "../../types";

export const getUsersWithRoles = async (db: Db) => {
    return await db.query.users.findMany({
        with: {
            role: true,
        },
    });
}

export const getUserByIdWithRoles = async (db: Db, userId: string) => {
    return await db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
            role: true,
        },
    });
}

export const deleteUser = async (db: Db, userId: string) => {
    await db.delete(users).where(eq(users.id, userId));
}

export async function updateUserAvatar(
    db: Db,
    userId: string,
    fileId: string | null
) {
    await db
        .update(users)
        .set({
            avatarFileId: fileId,
        })
        .where(
            eq(users.id, userId)
        );
}

export type UserWithRole = Awaited<
  ReturnType<typeof getUserByIdWithRoles>
>;
