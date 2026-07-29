import { api } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

type DeleteProjectMemberArgs = {
    projectSlug: string;
    userId: string;
};

export function useDeleteProjectMember() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            projectSlug,
            userId,
        }: DeleteProjectMemberArgs) => {
            const res = await api.projects[":projectSlug"].members[":userId"].$delete({
                param: {
                    projectSlug,
                    userId,
                },
            });

            return apiFetch(res);
        },

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [
                    "projects",
                    variables.projectSlug,
                ],
            });
        },
    });
}