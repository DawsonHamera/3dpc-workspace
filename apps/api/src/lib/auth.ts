import { Context } from "hono";
import { AppError } from "./errors";
import { Env } from "../types";

export function requireUser(
    c: Context<Env>
) {
    const user = c.get("user");

    if (!user) {
        throw new AppError(
            401,
            "UNAUTHORIZED",
            "User not authenticated"
        );
    }

    return user;
}