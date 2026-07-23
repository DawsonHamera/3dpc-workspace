import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import type { JSONContent } from "@tiptap/react";

export function useDocumentContent(id?: string) {
    return useQuery({
        queryKey: ["documents", id],
        enabled: !!id,

        queryFn: async (): Promise<JSONContent> => {
            const res = await api.files[":id"].download.$get({
                param: { id: id! },
            });

            if (!res.ok) {
                throw new Error("Failed to download document");
            }

            return await res.json();
        },
    });
}