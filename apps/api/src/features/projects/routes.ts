import { Hono } from "hono";
import { requireAuth } from "../../middleware/auth";
import { Env } from "../../types";
import { requireRole } from "../../middleware/role";
import { confirmUserProjectMembership, getProjectBySlug, getProjectsForUser } from "./service";

export const projectRoutes = new Hono<Env>()

    .get(
        "/",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        async (c) => {
            console.log("Fetching projects for user");
            const db = c.get("db");
            const user = c.get("user");

            if (!user) {
                return c.json(
                    { error: "Unauthorized" },
                    401
                );
            }


            console.log("Fetching projects for user:", user.id);
            const projects = await getProjectsForUser(db, user.id);

            return c.json(
                projects,
                200
            );
        }
    )


    .get(
        "/:projectSlug",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        async (c) => {
            const { projectSlug } = c.req.param();

            const db = c.get("db");

            const user = c.get("user");

            if (user && !(user.role === "Admin" || user.role === "Owner")) {
                const membership = await confirmUserProjectMembership(db, user.id, projectId);

                if (!membership) {
                    return c.json(
                        { error: "You do not have access to this project" },
                        403
                    );
                }
            }

            const project = await getProjectBySlug(db, projectSlug);

            if (!project) {
                return c.json({ error: "Project not found" }, 404);
            }
            return c.json(
                {
                    ...project,
                    files: project.files.map((pf) => pf.file),
                    members: project.members.map((pm) => pm.user),
                },
                200
            );
        }
    )