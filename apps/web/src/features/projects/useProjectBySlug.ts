import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { apiFetch } from "../apiFetch";


export function useProjectBySlug(slug: string) {
    return useQuery({
        queryKey: ["projects", slug],

        queryFn: async () => {
            const res = await api.projects[":slug"].$get({
                param: { slug }
            });

            return apiFetch(res);
        },

        staleTime: 1000 * 60 * 5,
    });
}

export type ProjectExtended = NonNullable<
  NonNullable<ReturnType<typeof useProjectBySlug>["data"]>
>;

// export type 

export type ProjectMember = NonNullable<
  NonNullable<ReturnType<typeof useProjectBySlug>["data"]>["members"][0]
>;