// services/auditLog.ts

import { auditLogs } from "../db/schema/audit_logs";
import { Db } from "../types";

type AuditLogData = {
    userId?: string;
    action: string;
    resourceType?: string;
    resourceId?: string;
    description?: string;
    metadata?: Record<string, unknown>;
};

export const AuditActions = {
    USER_REGISTERED: "USER_REGISTERED",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",

    PROJECT_CREATED: "PROJECT_CREATED",
    PROJECT_UPDATED: "PROJECT_UPDATED",
    PROJECT_DELETED: "PROJECT_DELETED",

    FILE_UPLOADED: "FILE_UPLOADED",
    PROJECT_FILE_UPLOADED: "PROJECT_FILE_UPLOADED",
    FILE_DELETED: "FILE_DELETED",
    PROJECT_FILE_DELETED: "PROJECT_FILE_DELETED",
    FILE_UPDATED: "FILE_UPDATED",
    PROJECT_MEMBERS_INVITED: "PROJECT_MEMBERS_INVITED",
    PROJECT_MEMBER_REMOVED: "PROJECT_MEMBER_REMOVED",
    PROJECT_MEMBER_ROLE_UPDATED: "PROJECT_MEMBER_ROLE_UPDATED",
    
    MEMBER_ADDED: "MEMBER_ADDED",
    USER_REMOVED: "USER_REMOVED",
    USER_UPDATED: "USER_UPDATED",

    ONSHAPE_CONNECT_CREATED: "ONSHAPE_CONNECT_CREATED",
    ONSHAPE_CONNECTION_REMOVED: "ONSHAPE_CONNECTION_REMOVED",
} as const;

export async function createAuditLog(
    db: Db,
    {
        userId,
        action,
        resourceType,
        resourceId,
        description,
        metadata,
    }: AuditLogData
) {
    await db.insert(auditLogs).values({
        userId,
        action,
        resourceType,
        resourceId,
        description,
        metadata,
    });
}

export function auditLogger(db: Db) {
    return {
        create: (data: AuditLogData) =>
            createAuditLog(db, data),
    };
}