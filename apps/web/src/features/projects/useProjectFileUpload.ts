import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { apiFetch } from "../apiFetch";

export type UploadMetadata = Record<string, unknown>;

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
        }: UploadArgs) => {

            const res = await api.projects[":slug"].files.$post({
                param: {
                    slug: projectSlug,
                },
                form: {
                    file,
                    metadata: metadata
                        ? JSON.stringify(metadata)
                        : undefined,
                },
            });

            if (!res.ok) {
                throw new Error("File upload failed");
            }

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