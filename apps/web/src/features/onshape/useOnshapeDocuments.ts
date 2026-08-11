import { useQuery } from "@tanstack/react-query";

import { api } from "@/api/client";
import { apiFetch } from "@/features/apiFetch";

export function useOnshapeDocuments() {
    return useQuery({
        queryKey: [
            "onshape-documents",
        ],

        queryFn: async () => {
            const res =
                await api.onshape.documents.$get();

            return apiFetch(res);
        }
    });
}