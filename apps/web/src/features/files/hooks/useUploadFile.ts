import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";

export type UploadMetadata = Record<string, unknown>;

type UploadArgs = {
    file: File;
    metadata?: UploadMetadata;
};

export function useUpload() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            file,
            metadata,
        }: UploadArgs) => {
            const formData = new FormData();

            formData.append("file", file);

            if (metadata) {
                formData.append(
                    "metadata",
                    JSON.stringify(metadata)
                );
            }

            const res = await api.files.upload.$post({
                form: formData,
            });

            return apiFetch(res);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["storage", "metrics"],
            });

            queryClient.invalidateQueries({
                queryKey: ["files"],
            });
        },
    });
}