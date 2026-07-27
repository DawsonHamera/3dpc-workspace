import { eq } from "drizzle-orm";
import { users } from "../../db/schema";
import { Db } from "../../types";


export const findUsersWithRoles = async (
    db: Db
) => {
    return db.query.users.findMany({
        with: {
            role: true,
        },
    });
};


export const findUserById = async (
    db: Db,
    userId: string
) => {
    return db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
            role: true,
        },
    });
};


export const updateUserRecord = async (
    db: Db,
    userId: string,
    data: Partial<typeof users.$inferInsert>
) => {

    await db
        .update(users)
        .set(data)
        .where(
            eq(users.id, userId)
        );

    return findUserById(
        db,
        userId
    );
};


export const deleteUserRecord = async (
    db: Db,
    userId: string
) => {

    await db
        .delete(users)
        .where(
            eq(users.id, userId)
        );
};


export const updateUserAvatarRecord = async (
    db: Db,
    userId: string,
    fileId: string | null
) => {

    await db
        .update(users)
        .set({
            avatarFileId: fileId,
        })
        .where(
            eq(users.id, userId)
        );
};