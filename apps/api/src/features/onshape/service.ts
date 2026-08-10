import {
    Bindings,
    ServicesContext,
} from "../../types";

import {
    AppError,
} from "../../lib/errors";

import {
    createOnshapeConnection,
    createOnshapeOAuthState,
    deleteOnshapeConnection,
    deleteOnshapeOAuthState,
    findOnshapeConnectionByUserId,
    findOnshapeOAuthState,
} from "./repository";
import { onshapeRequest } from "./client";
import { OnshapeDocument } from "./types";



type OAuthTokenResponse = {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
};



export const createOAuthState = async ({
    services,
    userId,
}: {
    services: ServicesContext;
    userId: string;
}) => {

    const state =
        crypto.randomUUID();

    const expiresAt =
        new Date(
            Date.now() + 10 * 60 * 1000
        );


    await createOnshapeOAuthState(
        services.db,
        {
            state,
            userId,
            expiresAt,
        }
    );

    console.log(
        "Created OAuth state:",
        state
    );
    return state;
};



export const getAuthorizationUrl = ({
    env,
    state,
}: {
    env: Bindings;
    state: string;
}) => {

    const params =
        new URLSearchParams({
            client_id:
                env.ONSHAPE_CLIENT_ID,

            response_type:
                "code",

            redirect_uri:
                env.ONSHAPE_REDIRECT_URI,

            scope:
                "OAuth2Read",

            state,
        });


    return (
        "https://oauth.onshape.com/oauth/authorize?" +
        params.toString()
    );
};



export const consumeOAuthState = async ({
    services,
    state,
}: {
    services: ServicesContext;
    state: string;
}) => {

    const oauthState =
        await findOnshapeOAuthState(
            services.db,
            state
        );


    if (!oauthState) {
        throw new AppError(
            400,
            "INVALID_OAUTH_STATE",
            "Invalid OAuth state"
        );
    }


    if (
        oauthState.expiresAt.getTime() <
        Date.now()
    ) {

        await deleteOnshapeOAuthState(
            services.db,
            state
        );

        throw new AppError(
            400,
            "EXPIRED_OAUTH_STATE",
            "OAuth state has expired"
        );
    }


    await deleteOnshapeOAuthState(
        services.db,
        state
    );

    console.log(
        "Consuming OAuth state:",
        state
    );


    return oauthState.userId;
};



export const exchangeCode = async ({
    env,
    code,
}: {
    env: Bindings;
    code: string;
}) => {

    const credentials =
        btoa(
            `${env.ONSHAPE_CLIENT_ID}:${env.ONSHAPE_CLIENT_SECRET}`
        );


    const response =
        await fetch(
            "https://oauth.onshape.com/oauth/token",
            {
                method: "POST",

                headers: {
                    Authorization:
                        `Basic ${credentials}`,

                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },

                body:
                    new URLSearchParams({
                        grant_type:
                            "authorization_code",

                        code,

                        redirect_uri:
                            env.ONSHAPE_REDIRECT_URI,
                    }),
            }
        );


    if (!response.ok) {
        throw new AppError(
            502,
            "ONSHAPE_OAUTH_FAILED",
            "Failed to exchange Onshape authorization code"
        );
    }


    const data =
        await response.json<OAuthTokenResponse>();


    return {
        accessToken:
            data.access_token,

        refreshToken:
            data.refresh_token ?? null,

        expiresAt:
            data.expires_in
                ? new Date(
                    Date.now() +
                    data.expires_in * 1000
                )
                : null,
    };
};

export const refreshOnshapeToken = async ({
    env,
    refreshToken,
}: {
    env: Bindings;
    refreshToken: string;
}) => {

    const credentials =
        btoa(
            `${env.ONSHAPE_CLIENT_ID}:${env.ONSHAPE_CLIENT_SECRET}`
        );


    const response =
        await fetch(
            "https://oauth.onshape.com/oauth/token",
            {
                method: "POST",

                headers: {
                    Authorization:
                        `Basic ${credentials}`,

                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },

                body:
                    new URLSearchParams({
                        grant_type:
                            "refresh_token",

                        refresh_token:
                            refreshToken,
                    }),
            }
        );


    if (!response.ok) {
        throw new AppError(
            502,
            "ONSHAPE_TOKEN_REFRESH_FAILED",
            "Failed to refresh Onshape access token"
        );
    }


    const data =
        await response.json<OAuthTokenResponse>();


    return {
        accessToken:
            data.access_token,

        refreshToken:
            data.refresh_token ??
            refreshToken,

        expiresAt:
            data.expires_in
                ? new Date(
                    Date.now() +
                    data.expires_in * 1000
                )
                : null,
    };
};


export const getOnshapeUser = async ({
    accessToken,
}: {
    accessToken: string;
}) => {

    const response =
        await fetch(
            "https://cad.onshape.com/api/users/sessioninfo",
            {
                headers: {
                    Authorization:
                        `Bearer ${accessToken}`,
                },
            }
        );


    if (!response.ok) {
        throw new AppError(
            502,
            "ONSHAPE_API_FAILED",
            "Failed to retrieve Onshape user"
        );
    }


    return response.json<{
        id: string;
    }>();
};



export const saveConnection = async ({
    services,
    userId,
    onshapeUserId,
    accessToken,
    refreshToken,
    expiresAt,
}: {
    services: ServicesContext;
    userId: string;
    onshapeUserId: string;
    accessToken: string;
    refreshToken: string | null;
    expiresAt: Date | null;
}) => {

    const existing =
        await findOnshapeConnectionByUserId(
            services.db,
            userId
        );


    if (existing) {

        throw new AppError(
            409,
            "ONSHAPE_ALREADY_CONNECTED",
            "Onshape is already connected"
        );
    }


    return createOnshapeConnection(
        services.db,
        {
            userId,
            onshapeUserId,
            accessToken,
            refreshToken,
            expiresAt,
        }
    );
};



export const getConnection = async ({
    services,
    userId,
}: {
    services: ServicesContext;
    userId: string;
}) => {

    return findOnshapeConnectionByUserId(
        services.db,
        userId
    );
};



export const disconnect = async ({
    services,
    userId,
}: {
    services: ServicesContext;
    userId: string;
}) => {

    return deleteOnshapeConnection(
        services.db,
        userId
    );
};

export const getOnshapeDocuments = async ({
    services,
    env,
    userId,
}: {
    services: ServicesContext;
    env: Bindings;
    userId: string;
}) => {

    const response =
        await onshapeRequest({
            services,
            env,
            userId,
            path: "/api/documents",
        });



    return response.json<OnshapeDocument[]>();
};

export const getOnshapeDocument = async ({
    services,
    env,
    userId,
    documentId,
}: {
    services: ServicesContext;
    env: Bindings;
    userId: string;
    documentId: string;
}) => {
    const response = await onshapeRequest({
        services,
        env,
        userId,
        path: `/api/documents/${documentId}`,
    });

    return response.json<OnshapeDocument>();
};