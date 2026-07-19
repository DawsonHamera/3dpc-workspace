import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";

export type StorageMetrics = {
    used: number;
    limit: number;
    remaining: number;
    percentage: number;
};

export function useStorageMetrics() {
    return useQuery({
        queryKey: ["storage", "metrics"],

        queryFn: async (): Promise<StorageMetrics> => {
            const res = await api.files.storage.usage.$get();

            if (!res.ok) {
                throw new Error(
                    "Failed to fetch storage metrics"
                );
            }

            return res.json();
        },

        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}