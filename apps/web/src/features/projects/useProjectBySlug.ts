import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { Project } from "./useProjects";

type FullProject = Project & {
    files: {
        id: string;
        originalName: string;
        type: string;
        size: number;
        createdAt: string;
        updatedAt: string;
    }[],
    members: {
        id: string;
        name: string;
        email: string;
    }[]
}
export function useProjectBySlug(projectSlug: string) {
    return useQuery({
        queryKey: ["projects", projectSlug],

        queryFn: async (): Promise<FullProject> => {
            const res = await api.projects[":projectSlug"].$get({
                param: {
                    projectSlug,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch project");
            }

            return res.json();
        },

        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}