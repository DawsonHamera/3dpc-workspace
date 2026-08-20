import { google } from "googleapis";

import type { Bindings } from "../types";

const GMAIL_USER = "me";

function getOAuthClient(env: Bindings) {
    return new google.auth.OAuth2(
        env.GOOGLE_CLIENT_ID,
        env.GOOGLE_CLIENT_SECRET,
    );
}

function getGmailClient(env: Bindings) {
    const oauth2Client =
        getOAuthClient(env);

    oauth2Client.setCredentials({
        refresh_token:
            env.GOOGLE_REFRESH_TOKEN,
    });

    return google.gmail({
        version: "v1",
        auth: oauth2Client,
    });
}

function encodeBase64Url(value: string) {
    return Buffer
        .from(value)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

export type SendEmailOptions = {
    to: string;
    subject: string;
    text: string;
};

export async function sendEmail({
    env,
    to,
    subject,
    text,
}: {
    env: Bindings;
} & SendEmailOptions) {
    const gmail =
        getGmailClient(env);

    const message = [
        `To: ${to}`,
        `From: ${GMAIL_USER}`,
        `Subject: ${subject}`,
        "Content-Type: text/plain; charset=utf-8",
        "",
        text,
    ].join("\r\n");

    const raw =
        encodeBase64Url(message);

    const response =
        await gmail.users.messages.send({
            userId: GMAIL_USER,
            requestBody: {
                raw,
            },
        });

    return response.data;
}
