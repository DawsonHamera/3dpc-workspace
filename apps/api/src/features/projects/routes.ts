import { Hono } from "hono";
import { requireAuth } from "../../middleware/auth";
import { Env } from "../../types";
import { requireRole } from "../../middleware/role";
import { checkForDuplicateFileInSameProject, confirmUserProjectMembership, createProject, deleteProject, getProjectBySlug, getProjectsForUser, getPublicProjects, saveProjectFile } from "./service";
import { R2Storage } from "../../services/storage";
import { handleFileUpload } from "../files/service";
import { requireProjectMembership } from "../../middleware/projectMembership";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { AppError } from "../../lib/errors";
import { validateJson } from "../../lib/validation";

const uploadSchema = z.object({
    file: z.instanceof(File),
    metadata: z.string().optional(),
})


const createProjectSchema = z.object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    visibility: z.enum(["public", "private"]).optional(),
    isFeatured: z.boolean().optional(),
    slug: z.string().min(1, "Project slug is required"),
});

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
                throw new AppError(
                    400,
                    "Bad Request",
                    "User not found",
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
        "/public",
        async (c) => {
            const db = c.get("db");

            const projects = await getPublicProjects(db);

            return c.json(
                projects,
                200
            );
        }
    )

    .post(
        "/:projectSlug/files",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        requireProjectMembership(),
        zValidator(
            "form",
            uploadSchema,
            (result, c) => {
                if (!result.success) {
                    throw new AppError(
                        400,
                        "VALIDATION_ERROR",
                        "Invalid upload data"
                    );
                }
            }
        ),
        async (c) => {
            const { projectSlug } = c.req.param();

            const db = c.get("db");

            const user = c.get("user");

            const { file } = c.req.valid("form");

            if (!user) {
                throw new AppError(
                    400,
                    "Bad Request",
                    "User not found",
                );
            }

            if (!file) {
                throw new AppError(
                    400,
                    "Bad Request",
                    "No file provided",
                );
            }

            const project = await getProjectBySlug(db, projectSlug);

            if (!project) {
                throw new AppError(
                    404,
                    "Not Found",
                    "Project not found",
                );
            }

            const duplicate = await checkForDuplicateFileInSameProject(db, project.id, file.name);
            if (duplicate) {
                throw new AppError(
                    400,
                    "Bad Request",
                    "A file with that name already exists in this project.",
                );
            }

            const fileResult = await handleFileUpload({
                db,
                storage: new R2Storage(c.env.FILES),
                file,
                uploadedBy: user.id,
                options: {
                    location: `projects`,
                }
            });

            await saveProjectFile(db, project.id, fileResult.id);

            return c.json(
                {
                    id: fileResult.id,
                },
                201
            );
        }
    )

    .post(
        "/",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        validateJson(createProjectSchema),
        async (c) => {
            const db = c.get("db");
            const user = c.get("user");

            if (!user) {
                throw new AppError(
                    400,
                    "Bad Request",
                    "User not found",
                );
            }

            const body = await c.req.json();

            const project = await createProject(db, {
                ...body,
                createdBy: user.id,
            });

            return c.json(
                {
                    ...project,
                },
                201
            );
        }
    )


    .get(
        "/:projectSlug",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        requireProjectMembership(),
        async (c) => {
            const { projectSlug } = c.req.param();

            const db = c.get("db");

            const project = await getProjectBySlug(db, projectSlug);

            if (!project) {
                throw new AppError(
                    404,
                    "Not Found",
                    "Project not found",
                );
            }
            return c.json(
                {
                    ...project,
                    files: project.files.map((pf) => pf.file),
                    members: project.members.map((pm) => ({
                        id: pm.id,
                        role: pm.role,
                        joinedAt: pm.joinedAt,
                        user: pm.user,
                    })),
                },
                200
            )
        }
    )


    .delete(
        "/:id",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        requireProjectMembership("Owner", "lead"),
        async (c) => {
            const { id } = c.req.param();

            const db = c.get("db");

            await deleteProject(db, id);

            return c.json(
                {
                    message: "Project deleted successfully",
                },
                200
            );
        }
    )