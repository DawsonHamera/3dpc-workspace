import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../apiFetch";

export function useGetUserDetails() {
    return useQuery({
        queryKey: ["users"],

        queryFn: async () => {
            const res = await api.users.$get();

            return apiFetch(res);
        },
    });
}

export type UserDetails = NonNullable<
    ReturnType<typeof useGetUserDetails>["data"]
>;