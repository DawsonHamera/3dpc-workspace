import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";

export type UpdateAvatarResponse = {
    avatarFileId: string;
};

export function useUpdateAvatar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            file: File
        ): Promise<UpdateAvatarResponse> => {
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

            if (!res.ok) {
                const body = await res
                    .json()
                    .catch(() => null);

                throw new Error(
                    body?.error ??
                    "Failed to update avatar."
                );
            }

            return res.json();
        },

        onSuccess: () => {
            // refresh user data so avatar updates everywhere
            queryClient.invalidateQueries({
                queryKey: ["auth", "me"],
            });
        },
    });
}