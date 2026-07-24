import { useQuery } from "@tanstack/react-query";
import type { FileRecord } from "./useGetFileById";
import { registry } from "@/pages/dashboard/FilePage";

export function useFileContent(
    fileRecord?: FileRecord,
    blob?: Blob
) {
    return useQuery({
        queryKey: [
            "file-content",
            fileRecord?.id,
            fileRecord?.updatedAt,
        ],

        queryFn: async () => {
            if (!blob || !fileRecord) {
                throw new Error("Missing file");
            }

            const registryEntry =
                registry[fileRecord.type as keyof typeof registry];

            if (!registryEntry) {
                throw new Error("Unsupported file type");
            }

            return registryEntry.adapter(blob);
        },

        enabled: !!blob && !!fileRecord,
        placeholderData: (previous) => previous,
    });

}