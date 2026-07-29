import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";
import { api } from "@/api/client";

type InviteProjectMembersInput = {
    projectSlug: string;
    userIds: string[];
};

export function useInviteProjectMembers() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            projectSlug,
            userIds,
        }: InviteProjectMembersInput) => {

            const res =
                await api.projects[":projectSlug"].members.$post({
                    param: {
                        projectSlug,
                    },
                    json: {
                        userIds,
                    },
                });

            return apiFetch(res);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    });
}