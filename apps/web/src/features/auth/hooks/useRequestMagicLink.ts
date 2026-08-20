import {
    useMutation,
} from "@tanstack/react-query";

import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";

export function useRequestMagicLink() {
    return useMutation({
        mutationFn: async (
            email: string
        ) => {
            const res =
                await api.auth["magic-link"].$post({
                    json: {
                        email,
                    },
                });

            return apiFetch(res);
        },
    });
}
