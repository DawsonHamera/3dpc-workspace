import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";

type ResourceType =
    | "file"
    | "onshape";

type Props = {
    projectSlug: string;
    resourceId: string;
    type: ResourceType;
};

export function useRemoveProjectResource() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            projectSlug,
            resourceId,
            type,
        }: Props) => {
            const res =
                await api.projects[":slug"].resources[":resourceId"][type].$delete({
                    param: {
                        slug: projectSlug,
                        resourceId,
                    },
                });

            return apiFetch(res);
        },

        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: [
                    "project-resources",
                    variables.projectSlug,
                ],
            });
        },
    });
}