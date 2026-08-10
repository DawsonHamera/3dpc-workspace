import {
    Box,
    File,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Resource } from "../types";
import { ResourceActions } from "./ResourceActions";

type Props = {
    resource: Resource;
    projectSlug: string;
};

export function ResourceListItem({
    resource,
    projectSlug,
}: Props) {
    const navigate = useNavigate();

    const icon =
        resource.type === "onshape"
            ? <Box />
            : <File />;

    const subtitle =
        resource.type === "onshape"
            ? "Onshape document"
            : resource.file
                ? resource.file.originalName
                : "File";

    return (
        <div
            className="
                flex items-center gap-4
                border-b last:border-b-0
                px-4 py-3
                transition-colors
                hover:bg-muted
            "
            onClick={() =>
                navigate(
                    `/projects/${projectSlug}/resources/${resource.id}`
                )
            }
        >
            <div className="
                flex size-10 shrink-0
                items-center justify-center
                rounded-md bg-muted
            ">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                    {resource.name}
                </p>

                <p className="
                    truncate
                    text-sm
                    text-muted-foreground
                ">
                    {subtitle}
                </p>
            </div>

            {resource.type === "file" &&
                resource.file && (
                    <div className="
                        hidden
                        text-sm
                        text-muted-foreground
                        sm:block
                    ">
                        {formatBytes(
                            resource.file.size
                        )}
                    </div>
                )}

            <div className="
                hidden
                text-sm
                text-muted-foreground
                md:block
            ">
                {formatDate(
                    resource.createdAt
                )}
            </div>

            <ResourceActions
                resource={resource}
            />
        </div>
    );
}

function formatDate(value: string) {
    return new Date(value).toLocaleDateString();
}

function formatBytes(bytes: number) {
    if (bytes === 0) {
        return "0 B";
    }

    const units = [
        "B",
        "KB",
        "MB",
        "GB",
    ];

    const index = Math.floor(
        Math.log(bytes) / Math.log(1024)
    );

    return `${(
        bytes /
        Math.pow(1024, index)
    ).toFixed(index === 0 ? 0 : 1)} ${
        units[index]
    }`;
}