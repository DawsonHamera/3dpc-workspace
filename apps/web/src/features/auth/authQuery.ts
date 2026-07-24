import { api } from "@/api/client";
import { apiFetch } from "../apiFetch";

export async function getCurrentUser() {
    const res = await api.auth.me.$get();

    //REQUIRED to handle 401 errors, otherwise the query will throw an error and not return null
    if (res.status === 401) {
        return null;
    }

    return apiFetch(res);
}


export const authQuery = {
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    select: (data: any) => data.user,
};