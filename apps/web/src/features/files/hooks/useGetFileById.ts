import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../apiFetch";

export function useGetFileById(id?: string) {
    return useQuery({
        queryKey: ["files", id],

        queryFn: async () => {
            const res = await api.files[":id"].$get({
                param: {
                    id: id!,
                },
            });

            return apiFetch(res);
        },

        enabled: Boolean(id),
    });
}

export type FileRecord = NonNullable<
    ReturnType<typeof useGetFileById>["data"]
>;