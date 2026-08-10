import { useQuery } from "@tanstack/react-query";

import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";

export function useProjectResources(
    slug: string,
) {
    return useQuery({
        queryKey: [
            "project-resources",
            slug,
        ],

        queryFn: async () => {
            const res =
                await api.projects[":slug"].resources.$get({
                    param: {
                        slug: slug,
                    },
                });

            return apiFetch(res);
        },

        enabled: !!slug,
    });
}