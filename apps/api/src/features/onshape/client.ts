import type {
    Bindings,
    ServicesContext,
} from "../../types";

import {
    AppError,
} from "../../lib/errors";

import {
    findOnshapeConnectionByUserId,
    updateOnshapeConnectionTokens,
} from "./repository";

import {
    refreshOnshapeToken,
} from "./service";


const ONSHAPE_API_URL =
    "https://cad.onshape.com";


const TOKEN_REFRESH_BUFFER =
    60 * 1000;


export const onshapeRequest = async ({
    services,
    env,
    userId,
    path,
    options = {},
}: {
    services: ServicesContext;
    env: Bindings;
    userId: string;
    path: string;
    options?: RequestInit;
}) => {
    let connection =
        await findOnshapeConnectionByUserId(
            services.db,
            userId
        );

    if (!connection) {
        throw new AppError(
            404,
            "ONSHAPE_NOT_CONNECTED",
            "Onshape is not connected"
        );
    }


    const needsRefresh =
        !connection.expiresAt ||
        connection.expiresAt.getTime() <
        Date.now() +
        TOKEN_REFRESH_BUFFER;


    if (needsRefresh) {

        if (!connection.refreshToken) {
            throw new AppError(
                401,
                "ONSHAPE_REAUTH_REQUIRED",
                "Onshape authorization has expired"
            );
        }


        const tokens =
            await refreshOnshapeToken({
                env,
                refreshToken:
                    connection.refreshToken,
            });


        await updateOnshapeConnectionTokens(
            services.db,
            connection.id,
            tokens
        );


        connection = {
            ...connection,

            accessToken:
                tokens.accessToken,

            refreshToken:
                tokens.refreshToken,

            expiresAt:
                tokens.expiresAt,
        };
    }

    console.log("Making Onshape API request to:", path);
    const response =
        await fetch(
            `${ONSHAPE_API_URL}${path}`,
            {
                ...options,

                headers: {
                    ...options.headers,

                    Authorization:
                        `Bearer ${connection.accessToken}`,

                    Accept:
                        "application/json",
                },
            }
        );


    if (!response.ok) {
        console.error(
            "Onshape API request failed:",
            response.status,
            response.statusText,
            await response.text()
        );
        throw new AppError(
            502,
            "ONSHAPE_API_FAILED",
            `Onshape API request failed with status ${response.status}`
        );
    }


    return response;
};