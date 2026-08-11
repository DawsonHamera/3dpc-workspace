import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Resource } from "../types";
import { useRemoveProjectResource } from "../hooks/useRemoveProjectResource";

type Props = {
    resource: Resource;
    projectSlug: string;
    handleOpen: () => void;
};

export function ResourceActions({
    resource,
    projectSlug,
    handleOpen,
}: Props) {
    const removeResource = useRemoveProjectResource();

    const handleDelete = async () => {
        if (
            !window.confirm(
                `Delete "${resource.name}" from this project?`
            )
        ) {
            return;
        }

        await removeResource.mutateAsync({
            projectSlug,
            resourceId: resource.id,
            type: resource.type,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <MoreHorizontal />
                    </Button>
                }
            />

            <DropdownMenuContent
                align="end"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <DropdownMenuItem
                    onClick={() => handleOpen()}
                >
                    Open
                </DropdownMenuItem>

                {/* <DropdownMenuItem>
                    Details
                </DropdownMenuItem> */}

                <DropdownMenuItem
                    variant="destructive"
                    disabled={
                        removeResource.isPending
                    }
                    onClick={handleDelete}
                >
                    {removeResource.isPending
                        ? "Deleting..."
                        : "Delete"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
