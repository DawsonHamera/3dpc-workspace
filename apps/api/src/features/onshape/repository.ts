import { eq } from "drizzle-orm";

import {
    onshapeConnections,
    onshapeOAuthStates,
} from "../../db/schema";

import {
    Db,
} from "../../types";



export const findOnshapeConnectionByUserId = async (
    db: Db,
    userId: string
) => {

    return db.query.onshapeConnections.findFirst({
        where: eq(
            onshapeConnections.userId,
            userId
        ),
    });
};



export const createOnshapeConnection = async (
    db: Db,
    data: typeof onshapeConnections.$inferInsert
) => {

    const [connection] =
        await db
            .insert(onshapeConnections)
            .values(data)
            .returning();

    return connection;
};



export const updateOnshapeConnection = async (
    db: Db,
    connectionId: string,
    data: Partial<
        typeof onshapeConnections.$inferInsert
    >
) => {

    const [connection] =
        await db
            .update(onshapeConnections)
            .set({
                ...data,
                updatedAt: new Date(),
            })
            .where(
                eq(
                    onshapeConnections.id,
                    connectionId
                )
            )
            .returning();

    return connection;
};



export const deleteOnshapeConnection = async (
    db: Db,
    userId: string
) => {

    await db
        .delete(onshapeConnections)
        .where(
            eq(
                onshapeConnections.userId,
                userId
            )
        );
};



export const createOnshapeOAuthState = async (
    db: Db,
    data: typeof onshapeOAuthStates.$inferInsert
) => {

    const [oauthState] =
        await db
            .insert(onshapeOAuthStates)
            .values(data)
            .returning();

    return oauthState;
};



export const findOnshapeOAuthState = async (
    db: Db,
    state: string
) => {

    return db.query.onshapeOAuthStates.findFirst({
        where: eq(
            onshapeOAuthStates.state,
            state
        ),
    });
};



export const deleteOnshapeOAuthState = async (
    db: Db,
    state: string
) => {

    await db
        .delete(onshapeOAuthStates)
        .where(
            eq(
                onshapeOAuthStates.state,
                state
            )
        );
};