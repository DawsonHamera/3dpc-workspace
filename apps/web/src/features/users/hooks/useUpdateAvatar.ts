import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";

export function useUpdateAvatar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            file: File
        ) => {
            const formData = new FormData();

            formData.append(
                "file",
                file
            );

            const res = await api.users.avatar.$patch(
                {
                    form: {
                        file,
                    },
                }
            );

            return apiFetch(res);
        },

        onSuccess: () => {
            // refresh user data so avatar updates everywhere
            queryClient.invalidateQueries({
                queryKey: ["auth", "me"],
            });
        },
    });
}