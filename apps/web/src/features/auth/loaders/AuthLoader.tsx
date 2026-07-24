// router.tsx

import { authQuery } from "@/features/auth/authQuery";
import { queryClient } from "@/lib/queryClient";
import { redirect } from "react-router-dom";


export async function requireAuth() {
    const user = await queryClient.ensureQueryData(authQuery);

    if (!user) {
        console.log("User not authenticated, redirecting to login");
        throw redirect("/login");
    }

    return user;
}


export async function redirectIfAuth() {

    const user = await queryClient.ensureQueryData(authQuery);

    if (user) {
        console.log("User is authenticated, redirecting to portal");
        throw redirect("/portal");
    }
    return null;
}