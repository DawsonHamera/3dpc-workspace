import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUserRole() {
    return useMutation({
        mutationFn: async ({
            userId,
            roleName,
        }: {
            userId: string;
            roleName: string;
        }) => {

            const res = await api.users[":id"].role.$patch({
                param: {
                    id: userId,
                },
                json: {
                    roleName,
                },
            });

            return apiFetch(res);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        }
    });
}