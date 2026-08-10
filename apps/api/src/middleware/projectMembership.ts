import { createMiddleware } from "hono/factory";
import { Env } from "../types";
import { AppError } from "../lib/errors";

export const requireProjectMembership = (...allowedMembershipRoles: string[]) => {
    return createMiddleware<Env>(async (c, next) => {
        const db = c.get("db");
        const user = c.get("user");

        const slug = c.req.param("slug");
        const id = c.req.param("id");

        if (!user) {
            throw new AppError(
                400,
                "Bad Request",
                "User not found",
            );
        }

        if (!slug && !id) {
            throw new AppError(
                400,
                "Bad Request",
                "Project slug or ID is required",
            );
        }

        const projectIdentifier = slug ?? id;

        if (!projectIdentifier) {
            throw new AppError(
                400,
                "Bad Request",
                "Project slug or ID is required",
            );
        }

        const project = await db.query.projects.findFirst({
            where: (projects, { eq }) =>
                slug
                    ? eq(projects.slug, projectIdentifier)
                    : eq(projects.id, projectIdentifier),
        });

        if (!project) {
            throw new AppError(
                404,
                "Not Found",
                "Project not found",
            );
        }

        const membership = await db.query.projectMembers.findFirst({
            where: (members, { eq, and }) =>
                and(
                    eq(members.projectId, project.id),
                    eq(members.userId, user.id)
                ),
        });

        const isGlobalAdmin =
            user.role === "admin" ||
            user.role === "owner";

        const hasMembershipAccess =
            !!membership &&
            (
                allowedMembershipRoles.length === 0 ||
                allowedMembershipRoles.includes(membership.role)
            );

        const canAccessPrivateProject =
            isGlobalAdmin || hasMembershipAccess;

        if (
            project.visibility === "private" &&
            !canAccessPrivateProject
        ) {
            throw new AppError(
                403,
                "Forbidden",
                "You do not have permission to access this project",
            );
        }

        c.set("projectMembership", membership?.role || "");

        await next();
    });
};