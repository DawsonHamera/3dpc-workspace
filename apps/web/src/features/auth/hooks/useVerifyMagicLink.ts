import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";
import { useRevalidator } from "react-router-dom";

export function useVerifyMagicLink() {
    const queryClient =
        useQueryClient();

    const revalidator = useRevalidator();

    return useMutation({
        mutationFn: async (
            token: string
        ) => {
            const res =
                await api.auth["magic-link"].verify.$post({
                    json: {
                        token,
                    },
                });

            return apiFetch(res);
        },

        onSuccess: async () => {
            await queryClient.refetchQueries({
                queryKey: ["auth", "me"],
            });
            revalidator.revalidate();

        },
    });
}
