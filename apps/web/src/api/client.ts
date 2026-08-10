import { hc } from "hono/client";
import type { AppType } from "@3dpc/api";
const API_URL = import.meta.env.VITE_API_URL ?? "";

export const api = hc<AppType>(
    API_URL,
    {
        init: {
            credentials: "include",
        },
    }
);

