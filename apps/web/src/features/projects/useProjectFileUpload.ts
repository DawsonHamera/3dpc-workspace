import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { apiFetch } from "../apiFetch";

export type UploadMetadata = Record<string, unknown>;

export type UploadResponse = {
    id: string;
};

type UploadArgs = {
    file: File;
    projectSlug: string;
    metadata?: UploadMetadata;
};

export function useProjectFileUpload() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            file,
            projectSlug,
            metadata,
        }: UploadArgs): Promise<UploadResponse> => {

            const res = await api.projects[":projectSlug"].files.$post({
                param: {
                    projectSlug: projectSlug,
                },
                form: {
                    file,
                    metadata: metadata
                        ? JSON.stringify(metadata)
                        : undefined,
                },
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

             queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    });
}