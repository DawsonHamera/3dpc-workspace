import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";
import { api } from "@/api/client";

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            name: string;
            description?: string;
            shortDescription?: string;
            visibility?: "public" | "private";
            isFeatured?: boolean;
            slug: string;
        }) => {

            const res = await api.projects.$post({
                json: data
            });

            return apiFetch(res);
        },

        onSuccess: () => {
           queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    });
}

export type CreateProjectData = {
    name: string;
    description?: string;
    shortDescription?: string;
    visibility?: "public" | "private";
    isFeatured?: boolean;
    slug: string;
}