import { hc } from "hono/client";
import type { AppType } from "@3dpc/api";

export const api = hc<AppType>(
    "/api",
    {
        init: {
            credentials: "include",
        },
    }
);