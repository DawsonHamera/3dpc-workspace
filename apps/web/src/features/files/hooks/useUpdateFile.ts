import { api } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../apiFetch";

type UpdateFileArgs = {
    id: string;
    file: File;
};

export function useUpdateFile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            file,
        }: UpdateFileArgs) => {
            const res = await api.files[":id"].$patch({
                param: {
                    id,
                },
                form: {
                    file,
                },
            });

            return apiFetch(res);
        },

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["files", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["files", variables.id, "download"],
            });

            queryClient.invalidateQueries({
                queryKey: ["files"],
            });

            queryClient.invalidateQueries({
                queryKey: ["file-content", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    });
}