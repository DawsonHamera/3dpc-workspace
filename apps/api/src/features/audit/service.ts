import type { Context } from "hono";
import { desc, eq } from "drizzle-orm";
import { auditLogs } from "../../db/schema";
import { Db } from "../../types";

export type CreateAuditLogInput = {
    userId?: string;

    action: string;

    resourceType?: string;

    resourceId?: string;

    description?: string;

    metadata?: Record<string, unknown>;
};


export async function createAuditLog(
    db: Db,
    data: CreateAuditLogInput
) {
    const [log] = await db
        .insert(auditLogs)
        .values({
            userId: data.userId,
            action: data.action,
            resourceType: data.resourceType,
            resourceId: data.resourceId,
            description: data.description,
            metadata: data.metadata,
        })
        .returning();

    return log;
}


export async function getAuditLogs(
    db: Db,
    options?: {
        userId?: string;
        limit?: number;
    }
) {
    const limit = options?.limit ?? 50;


    if (options?.userId) {
        return db.query.auditLogs.findMany({
            where: eq(auditLogs.userId, options.userId),

            with: {
                user: {
                    columns: {
                        id: true,
                        name: true,
                        email: true,
                        avatarId: true,
                    },
                },
            },

            orderBy: desc(auditLogs.createdAt),

            limit,
        });
    }


    return db.query.auditLogs.findMany({
        with: {
            user: {
                columns: {
                    id: true,
                    name: true,
                    email: true,
                    avatarId: true,
                },
            },
        },

        orderBy: desc(auditLogs.createdAt),

        limit,
    });
}