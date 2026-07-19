import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";

export type UploadMetadata = Record<string, unknown>;

export type UploadResponse = {
    id: string;
};

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
        }: UploadArgs): Promise<UploadResponse> => {
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

            if (!res.ok) {
                const body = await res.json().catch(() => null);

                throw new Error(
                    body?.error ?? "Failed to upload file."
                );
            }

            return res.json();
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