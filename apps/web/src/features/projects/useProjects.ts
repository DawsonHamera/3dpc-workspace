import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { apiFetch } from "../apiFetch";

export function useProjects() {
    return useQuery({
        queryKey: ["projects"],

        queryFn: async () => {
            const res = await api.projects.$get();

            if (!res.ok) {
                throw new Error("Failed to fetch projects");
            }

            return apiFetch(res);
        },

        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}