import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { apiFetch } from "../apiFetch";


export function useProjectBySlug(projectSlug: string) {
    return useQuery({
        queryKey: ["projects", projectSlug],

        queryFn: async () => {
            const res = await api.projects[":projectSlug"].$get({
                param: { projectSlug }
            });

            return apiFetch(res);
        },

        staleTime: 1000 * 60 * 5,
    });
}

export type ProjectExtended = NonNullable<
  NonNullable<ReturnType<typeof useProjectBySlug>["data"]>
>;

export type ProjectMember = NonNullable<
  NonNullable<ReturnType<typeof useProjectBySlug>["data"]>["members"][0]
>;