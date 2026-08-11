import { Hono } from "hono";

import {
    requireAuth,
} from "../../middleware/auth";

import {
    AppError,
} from "../../lib/errors";

import {
    createOAuthState,
    consumeOAuthState,
    disconnect,
    exchangeCode,
    getAuthorizationUrl,
    getConnection,
    getOnshapeUser,
    saveConnection,
    getOnshapeDocuments,
    getOnshapeDocument,
    getOnshapeThumbnail,
} from "./service";
import { Env } from "../../types";
import { onshapeRequest } from "./client";
import { requireUser } from "../../lib/auth";
import { AuditActions } from "../../services/auditLog";



export const onshapeRoutes = new Hono<Env>()

    .get(
        "/connect",
        requireAuth,

        async (c) => {

            const user = requireUser(c);

            const services =
                c.get("services");

            const state =
                await createOAuthState({
                    services:
                        c.get("services"),

                    userId:
                        user.id,
                });


            const url =
                getAuthorizationUrl({
                    env: c.env,
                    state,
                });


            await services.audit.create({
                userId: user.id,
                action: AuditActions.ONSHAPE_CONNECT_INITIATED,
                resourceType: "user",
                resourceId: user.id,
            });


            return c.redirect(
                url
            );
        }
    )



    .get(
        "/callback",

        async (c) => {

            const code =
                c.req.query("code");

            const state =
                c.req.query("state");

            const error =
                c.req.query("error");


            if (error) {
                throw new AppError(
                    400,
                    "ONSHAPE_OAUTH_DENIED",
                    "Onshape authorization was denied"
                );
            }


            if (!code || !state) {
                throw new AppError(
                    400,
                    "BAD_REQUEST",
                    "Missing OAuth callback parameters"
                );
            }


            const userId =
                await consumeOAuthState({
                    services:
                        c.get("services"),

                    state,
                });


            const tokens =
                await exchangeCode({
                    env:
                        c.env,

                    code,
                });


            const onshapeUser =
                await getOnshapeUser({
                    accessToken:
                        tokens.accessToken,
                });


            await saveConnection({
                services:
                    c.get("services"),

                userId,

                onshapeUserId:
                    onshapeUser.id,

                accessToken:
                    tokens.accessToken,

                refreshToken:
                    tokens.refreshToken,

                expiresAt:
                    tokens.expiresAt,
            });


            return c.redirect(
                `${c.env.FRONTEND_URL}/dashboard/account`
            );
        }
    )



    .get(
        "/connection",
        requireAuth,
        async (c) => {

            const user =
                requireUser(c);

            const connection =
                await getConnection({
                    services:
                        c.get("services"),

                    userId:
                        user.id,
                });


            return c.json({
                connected:
                    !!connection,
            });
        }
    )



    .delete(
        "/connection",
        requireAuth,
        async (c) => {
            const user =
                requireUser(c);

            await disconnect({
                services:
                    c.get("services"),

                userId:
                    user.id,
            });


            return c.json({
                message:
                    "Disconnected Onshape",
            });
        }
    )

    .get(
        "/documents",
        requireAuth,
        async (c) => {

            const user =
                requireUser(c);

            const documents =
                await getOnshapeDocuments({
                    services:
                        c.get("services"),

                    env:
                        c.env,

                    userId:
                        user.id,
                });


            return c.json(
                documents
            );
        }
    )

    .get(
        "/documents/:documentId/thumbnail",
        requireAuth,
        async (c) => {
            const user = requireUser(c);

            const document =
                await getOnshapeDocument({
                    services: c.get("services"),
                    env: c.env,
                    userId: user.id,
                    documentId:
                        c.req.param("documentId"),
                });

            const thumbnail =
                document.thumbnail?.sizes?.find(
                    (size) =>
                        size.size === "600x340",
                );

            if (!thumbnail?.href) {
                throw new AppError(
                    404,
                    "ONSHAPE_THUMBNAIL_NOT_FOUND",
                    "Onshape document has no thumbnail",
                );
            }

            const response =
                await getOnshapeThumbnail({
                    services: c.get("services"),
                    env: c.env,
                    userId: user.id,
                    url: thumbnail.href,
                });

            return new Response(
                response.body,
                {
                    status: response.status,
                    headers: {
                        "Content-Type":
                            response.headers.get(
                                "Content-Type",
                            ) ?? "image/png",

                        "Cache-Control":
                            "public, max-age=300",
                    },
                },
            );
        },
    );