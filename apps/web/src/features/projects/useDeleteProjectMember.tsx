import { api } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

type DeleteProjectMemberArgs = {
    slug: string;
    userId: string;
};

export function useDeleteProjectMember() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            slug,
            userId,
        }: DeleteProjectMemberArgs) => {
            const res = await api.projects[":slug"].members[":userId"].$delete({
                param: {
                    slug,
                    userId,
                },
            });

            return apiFetch(res);
        },

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [
                    "projects",
                    variables.slug,
                ],
            });
        },
    });
}