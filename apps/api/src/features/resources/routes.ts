import { Hono } from "hono";

import {
    requireAuth,
} from "../../middleware/auth";

import {
    createOnshapeResourceSchema,
} from "./validators";

import {
    createOnshapeProjectResource,
    getProjectResources,
} from "./service";

import type {
    Env,
    ServicesContext,
} from "../../types";
import { getProjectBySlug } from "../projects/service";
import { AppError } from "../../lib/errors";
import { requireUser } from "../../lib/auth";
import { validateJson } from "../../lib/validation";
import { requireProjectMembership } from "../../middleware/projectMembership";

export const resourcesRoutes = new Hono<Env>()
    .get(
        "/",
        requireAuth,
        requireProjectMembership(),
        async (c) => {
            const projectSlug = c.req.param("slug");

            if (!projectSlug) {
                throw new AppError(
                    400,
                    "MISSING_PROJECT_SLUG",
                    "Missing project slug",
                );
            }

            const project = await getProjectBySlug(
                c.get("services"),
                projectSlug,
            );

            if (!project) {
                throw new AppError(
                    404,
                    "NOT_FOUND",
                    "Project not found",
                );
            }

            const resources = await getProjectResources(
                c.get("services"),
                c.env,
                project.id,
            );

            return c.json(resources);
        },
    )
    .post(
        "/onshape",
        requireAuth,
        validateJson(createOnshapeResourceSchema),
        async (c) => {

            const user = requireUser(c);

            const services =
                c.get("services");

            const projectSlug =
                c.req.param("slug");

            const { documentId } = await c.req.json();
            /*
             * Resolve the project here.
             *
             * Use your existing project repository/service
             * rather than querying the projects table directly.
             */

            if (!projectSlug) {
                throw new AppError(
                    400,
                    "MISSING_PROJECT_SLUG",
                    "Missing project slug"
                );
            }

            const project =
                await getProjectBySlug(
                    services,
                    projectSlug,
                );

            if (!project) {
                throw new AppError(
                    404,
                    "PROJECT_NOT_FOUND",
                    "Project not found"
                );
            }

            const resource =
                await createOnshapeProjectResource({
                    services,
                    env: c.env,
                    userId: user.id,
                    projectId: project.id,
                    documentId,
                });

            await services.audit.create({
                userId: user.id,
                action: "RESOURCE_CREATED",
                resourceType: "resource",
                resourceId: resource.id,
                description: `Created Onshape resource ${resource.id} for project ${project.slug}`,
            });

            return c.json(
                resource,
                201,
            );
        },
    );