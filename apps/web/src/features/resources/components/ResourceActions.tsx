import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Resource } from "../types";

type Props = {
    resource: Resource;
};

export function ResourceActions({
    resource,
}: Props) {
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
                <DropdownMenuItem>
                    Open
                </DropdownMenuItem>

                <DropdownMenuItem>
                    Details
                </DropdownMenuItem>

                <DropdownMenuItem>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}