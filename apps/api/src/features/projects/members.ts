import { and, eq } from "drizzle-orm";

import { projectMembers } from "../../db/schema";
import type { Db } from "../../types";

export async function confirmUserProjectMembership(
    db: Db,
    userId: string,
    projectId: string
) {
    return db.query.projectMembers.findFirst({
        where: and(
            eq(projectMembers.userId, userId),
            eq(projectMembers.projectId, projectId)
        ),
    });
}