import { api } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

type DeleteProjectArgs = {
    id: string;
};

export function useDeleteProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
        }: DeleteProjectArgs) => {
            const res = await api.projects[":id"].$delete({
                param: {
                    id,
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
                queryKey: ["projects", variables.id],
            });

            queryClient.removeQueries({
                queryKey: ["projects", variables.id, "files"],
            });
        },
    });
}