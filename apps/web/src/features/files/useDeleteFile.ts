import { api } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

type DeleteFileArgs = {
    id: string;
};

export function useFileDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
        }: DeleteFileArgs) => {
            const res = await api.files[":id"].$delete({
                param: {
                    id,
                },
            });

            return apiFetch(res);
        },

        onSuccess: (_, variables) => {

            // remove individual cache
            queryClient.removeQueries({
                queryKey: ["files", variables.id],
            });

            queryClient.removeQueries({
                queryKey: ["files", variables.id, "download"],
            });

            queryClient.removeQueries({
                queryKey: ["file-content", variables.id],
            });


            // refresh project relation
            queryClient.invalidateQueries({
                queryKey: [
                    "projects",
                ],
            });


            // refresh file lists
            queryClient.invalidateQueries({
                queryKey: ["files"],
            });
        },
    });
}