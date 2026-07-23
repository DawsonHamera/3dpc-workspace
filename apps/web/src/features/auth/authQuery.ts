import { api } from "@/api/client";

export async function getCurrentUser() {
    const res = await api.auth.me.$get();

    if (res.status === 401) {
        return null;
    }

    if (!res.ok) {
        throw new Error("Failed to load user");
    }

    return res.json();
}


export const authQuery = {
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
};