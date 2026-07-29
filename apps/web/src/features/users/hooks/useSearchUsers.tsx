import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";
import { useQuery } from "@tanstack/react-query";

export function useSearchUsers(
    query: string,
    limit = 20,
    excludeUserId?: string
) {
    return useQuery({
        queryKey: [
            "users",
            "directory",
            query,
            limit,
            excludeUserId,
        ],

        queryFn: async () => {

            const res =
                await api.users.directory.$get({
                    query: {
                        q: query,
                        limit: limit.toString(),
                        excludeUser: excludeUserId,
                    },
                });


            return apiFetch(res);
        },

        staleTime: 30_000,
    });
}