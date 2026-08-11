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

    const thumbnail =
        resource.type === "onshape"
            ? `/api/onshape/documents/${resource.onshape.id}/thumbnail`
            : undefined;

    const handleClick = () => {
        if (resource.type === "onshape") {
            const url =
                `https://cad.onshape.com/documents/` +
                `${resource.onshape.id}/w/` +
                `${resource.onshape.defaultWorkspace.id}`;

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

            return;
        }

        navigate(
            `/projects/${projectSlug}/resources/${resource.id}`
        );
    };

    return (
        <Card
            className="
                cursor-pointer
                overflow-hidden
                transition-colors
                hover:bg-muted/50
            "
            onClick={handleClick}
        >
            <div
                className="
                    relative
                    aspect-video
                    overflow-hidden
                    bg-muted
                "
            >
                {thumbnail ? (
                    <>
                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                                justify-center
                                text-muted-foreground
                            "
                        >
                            {icon}
                        </div>

                        <img
                            src={thumbnail}
                            alt={`${resource.name} thumbnail`}
                            className="
                                relative
                                size-full
                                object-cover
                            "
                            onLoad={(event) => {
                                event.currentTarget.style.opacity = "1";
                            }}
                            onError={(event) => {
                                event.currentTarget.style.display =
                                    "none";
                            }}
                            style={{ opacity: 0 }}
                        />
                    </>
                ) : (
                    <div
                        className="
                            flex
                            size-full
                            items-center
                            justify-center
                            text-muted-foreground
                        "
                    >
                        {icon}
                    </div>
                )}
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
                    projectSlug={projectSlug}
                    handleOpen={() => handleClick()}
                />
            </CardContent>
        </Card>
    );
}
