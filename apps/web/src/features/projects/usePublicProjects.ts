import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { apiFetch } from "../apiFetch";

export function usePublicProjects() {
    return useQuery({
        queryKey: ["projects"],

        queryFn: async () => {
            const res = await api.projects.public.$get();

            if (!res.ok) {
                throw new Error("Failed to fetch projects");
            }

            return apiFetch(res);
        },

    });
}

