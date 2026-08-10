import {
    Box,
    File,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import type { Resource } from "../types";
import { ResourceActions } from "./ResourceActions";

type Props = {
    resource: Resource;
    projectSlug: string;
};

export function ResourceCard({
    resource,
    projectSlug,
}: Props) {
    const navigate = useNavigate();

    const icon =
        resource.type === "onshape"
            ? <Box className="size-8" />
            : <File className="size-8" />;

    return (
        <Card
            className="
                cursor-pointer
                overflow-hidden
                transition-colors
                hover:bg-muted/50
            "
            onClick={() =>
                navigate(
                    `/projects/${projectSlug}/resources/${resource.id}`
                )
            }
        >
            <div className="
                flex
                aspect-video
                items-center
                justify-center
                bg-muted
            ">
                {icon}
            </div>

            <CardContent className="flex items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                        {resource.name}
                    </p>

                    <p className="
                        text-sm
                        text-muted-foreground
                    ">
                        {resource.type === "onshape"
                            ? "Onshape document"
                            : resource.file?.type ??
                              "File"}
                    </p>
                </div>

                <ResourceActions
                    resource={resource}
                />
            </CardContent>
        </Card>
    );
}