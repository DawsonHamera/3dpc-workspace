// PortalLoader.ts
import { redirect } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import { authQuery } from "@/features/auth/authQuery";

export async function portalLoader() {
    const user = await queryClient.ensureQueryData(authQuery);

    if (!user) {
        throw redirect("/login");
    }

    const preferredMode = localStorage.getItem("interface-mode");

    if (preferredMode === "mobile") {
        throw redirect("/app");
    }

    if (preferredMode === "desktop") {
        throw redirect("/dashboard");
    }

    const isMobile = window.matchMedia(
        "(max-width: 768px)"
    ).matches;

    throw redirect(
        isMobile ? "/app" : "/dashboard"
    );
}