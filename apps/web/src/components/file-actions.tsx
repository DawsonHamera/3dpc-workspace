import { useFileDelete } from "@/features/files/useDeleteFile";
import type { ProjectFile } from "./project-files-table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";

export const FileActions = ({
    file,
}: {
    file: ProjectFile,
}) => {
    const deleteFile = useFileDelete();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreHorizontal />
                    </Button>
                }
            />

            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();

                        deleteFile.mutate({
                            id: file.id,
                        });
                    }}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}