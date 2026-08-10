import { api } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

type DeleteProjectArgs = {
    slug: string;
};

export function useDeleteProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            slug,
        }: DeleteProjectArgs) => {
            const res = await api.projects[":slug"].$delete({
                param: {
                    slug,
                },
            });

            return apiFetch(res);
        },

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
            // remove individual cache
            queryClient.removeQueries({
                queryKey: ["projects", variables.slug],
            });

            queryClient.removeQueries({
                queryKey: ["projects", variables.slug, "files"],
            });
        },
    });
}