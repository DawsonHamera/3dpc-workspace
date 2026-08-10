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
} from "./service";
import { Env } from "../../types";



export const onshapeRoutes = new Hono<Env>()

    .get(
        "/connect",
        requireAuth,

        async (c) => {

            const user =
                c.get("user");


            if (!user) {
                throw new AppError(
                    401,
                    "UNAUTHORIZED",
                    "Unauthorized"
                );
            }


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
                `${c.env.FRONTEND_URL}/settings/integrations`
            );
        }
    )



    .get(
        "/connection",
        requireAuth,
        async (c) => {

            const user =
                c.get("user");


            if (!user) {
                throw new AppError(
                    401,
                    "UNAUTHORIZED",
                    "Unauthorized"
                );
            }


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
                c.get("user");

            if (!user) {
                throw new AppError(
                    401,
                    "UNAUTHORIZED",
                    "Unauthorized"
                );
            }

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
                c.get("user");


            if (!user) {
                throw new AppError(
                    401,
                    "UNAUTHORIZED",
                    "Unauthorized"
                );
            }


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
    );