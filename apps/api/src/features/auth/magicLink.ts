import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";

import type { Db, Bindings } from "../../types";
import { users, magicLoginTokens } from "../../db/schema";
import { sendEmail } from "../../services/gmail";
import { createSession } from "./service";

function hashToken(token: string) {
    return createHash("sha256")
        .update(token)
        .digest("hex");
}

export async function sendMagicLoginLink({
    db,
    env,
    email,
    frontendUrl,
}: {
    db: Db;
    env: Bindings;
    email: string;
    frontendUrl: string;
}) {
    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    // Don't reveal whether the account exists.
    if (!user) {
        return;
    }

    const token = randomBytes(32).toString("hex");
    const tokenHash = hashToken(token);

    await db
        .delete(magicLoginTokens)
        .where(
            eq(
                magicLoginTokens.userId,
                user.id,
            ),
        );

    await db.insert(magicLoginTokens).values({
        userId: user.id,
        tokenHash,
        expiresAt: new Date(
            Date.now() + 15 * 60 * 1000
        ),
    });

    const url =
        `${frontendUrl}/login/magic?token=${token}`;
    
    await sendEmail({
        env,
        to: user.email,
        subject: "Your 3DPC Workspace login link",
        text: [
            `Hi ${user.name},`,
            "",
            "Use the link below to sign in to 3DPC Workspace:",
            "",
            url,
            "",
            "This link expires in 15 minutes and can only be used once.",
            "",
            "If you didn't request this, you can safely ignore this email.",
        ].join("\n"),
    });
}

export async function verifyMagicLogin({
    db,
    token,
}: {
    db: Db;
    token: string;
}) {
    const tokenHash = hashToken(token);

    const record =
        await db.query.magicLoginTokens.findFirst({
            where: eq(
                magicLoginTokens.tokenHash,
                tokenHash,
            ),
        });

    if (!record) {
        return null;
    }

    if (record.usedAt) {
        return null;
    }

    if (record.expiresAt <= new Date()) {
        return null;
    }

    await db
        .delete(magicLoginTokens)
        .where(
            eq(
                magicLoginTokens.id,
                record.id,
            ),
        );

    return createSession(
        db,
        record.userId,
    );
}