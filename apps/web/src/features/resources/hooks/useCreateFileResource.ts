import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";

export type CreateFileResourceData = {
    projectSlug: string;
    file: File;
};

export function useCreateFileResource() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            projectSlug,
            file,
        }: CreateFileResourceData) => {

            const res =
                await api.projects[":slug"].resources.file.$post({
                    param: {
                        slug: projectSlug,
                    },

                    form: {
                        file,
                    },
                });

            return apiFetch(res);
        },

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: [
                    "project-resources",
                    variables.projectSlug,
                ],
            });
        },
    });
}