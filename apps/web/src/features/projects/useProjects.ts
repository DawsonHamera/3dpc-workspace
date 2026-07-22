import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";

export type Project = {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    visibility: boolean;
    status: string;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
};

export function useProjects() {
    return useQuery({
        queryKey: ["projects"],

        queryFn: async (): Promise<Project[]> => {
            const res = await api.projects.$get();

            if (!res.ok) {
                throw new Error("Failed to fetch projects");
            }

            return res.json();
        },

        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}