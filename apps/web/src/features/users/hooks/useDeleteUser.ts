import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export function useDeleteUser() {
    return useMutation({
        
        mutationFn: async (userId: string) => {
            const res = await api.users[":id"].$delete({
                param: {
                    id: userId,
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