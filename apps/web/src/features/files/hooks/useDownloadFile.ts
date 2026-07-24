import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";

type DownloadFileOptions = {
    staleTime?: number;
    refetchOnMount?: boolean;
};

export function useDownloadFile(
    id?: string,
    options?: DownloadFileOptions
) {
    return useQuery({
        queryKey: ["files", id, "download"],

        queryFn: async (): Promise<Blob> => {
            const res = await api.files[":id"].download.$get({
                param: { id: id! },
            });

            if (!res.ok) {
                throw new Error("Failed to download file");
            }

            return res.blob();
        },

        enabled: Boolean(id),

        staleTime: options?.staleTime ?? 0,
        refetchOnMount: options?.refetchOnMount ?? true,
    });
}