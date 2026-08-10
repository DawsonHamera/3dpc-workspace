import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";

export type CreateOnshapeResourceData = {
    projectSlug: string;
    documentId: string;
};

export function useCreateOnshapeResource() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: async ({
            projectSlug,
            documentId,
        }: CreateOnshapeResourceData) => {

            const res = await api.projects[":slug"].resources.onshape.$post({
                    param: {
                        slug: projectSlug,
                    },

                    json: {
                        documentId,
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
