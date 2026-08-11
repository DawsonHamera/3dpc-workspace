import { hashToken } from "../lib/crypto";

const ALGORITHM = "pbkdf2-sha256";
const ITERATIONS = 100_000;
const SALT_LENGTH = 16;
const KEY_LENGTH = 256;

const encoder = new TextEncoder();

function toBase64(bytes: Uint8Array): string {
    let binary = "";

    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
    const binary = atob(value);

    return Uint8Array.from(
        binary,
        (char) => char.charCodeAt(0)
    );
}

async function deriveKey(
    password: string,
    salt: Uint8Array,
    iterations: number,
) {
    const keyMaterial =
        await crypto.subtle.importKey(
            "raw",
            encoder.encode(password),
            "PBKDF2",
            false,
            ["deriveBits"],
        );

    return new Uint8Array(
        await crypto.subtle.deriveBits(
            {
                name: "PBKDF2",
                salt,
                iterations,
                hash: "SHA-256",
            },
            keyMaterial,
            KEY_LENGTH,
        )
    );
}

export async function hashPassword(
    password: string,
): Promise<string> {
    const salt = crypto.getRandomValues(
        new Uint8Array(SALT_LENGTH)
    );

    const hash = await deriveKey(
        password,
        salt,
        ITERATIONS,
    );

    return [
        ALGORITHM,
        ITERATIONS,
        toBase64(salt),
        toBase64(hash),
    ].join("$");
}

export async function verifyPassword(
    password: string,
    storedHash: string,
): Promise<boolean> {

    const [
        algorithm,
        iterationsString,
        saltString,
        hashString,
    ] = storedHash.split("$");

    if (
        algorithm !== ALGORITHM ||
        !iterationsString ||
        !saltString ||
        !hashString
    ) {
        return false;
    }

    const iterations =
        Number(iterationsString);

    if (!Number.isInteger(iterations)) {
        return false;
    }

    const salt = fromBase64(saltString);
    const expected = fromBase64(hashString);

    const actual = await deriveKey(
        password,
        salt,
        iterations,
    );

    if (actual.length !== expected.length) {
        return false;
    }

    return crypto.subtle.timingSafeEqual(
        actual,
        expected,
    );
}