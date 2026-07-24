import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUserPassword() {
    return useMutation({
        mutationFn: async ({
            userId,
            currentPassword,
            newPassword,
        }: {
            userId: string;
            currentPassword?: string;
            newPassword: string;
        }) => {

            const res = await api.users[":id"].password.$patch({
                param: {
                    id: userId,
                },
                json: {
                    currentPassword,
                    newPassword,
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