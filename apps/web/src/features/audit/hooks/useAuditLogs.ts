import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../apiFetch";

export function useAuditLogs(limit: number = 100) {
    return useQuery({
        queryKey: ["audit-logs", limit],

        queryFn: async () => {
            const res = await api.audit.$get({
                query: {
                    limit: String(limit),
                },
            });

            const data = await apiFetch(res);
            return data.data;
        },
        refetchInterval: 60_000,
        staleTime: 30_000,
    });
}

export type AuditLog = NonNullable<ReturnType<typeof useAuditLogs>["data"]>[0];