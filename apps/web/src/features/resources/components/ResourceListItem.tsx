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
            ? <Box className="size-5" />
            : <File className="size-5" />;

    const subtitle =
        resource.type === "onshape"
            ? "Onshape document"
            : resource.file
                ? resource.file.originalName
                : "File";

      const thumbnail =
        resource.type === "onshape"
            ? `${import.meta.env.VITE_API_URL}/onshape/documents/${resource.onshape.id}/thumbnail`
            : resource.type === "file" && resource.file?.id
            ? `${import.meta.env.VITE_API_URL}/files/${resource.file.id}/download`
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
        if (resource.type === "file" && resource.file?.id) {
            navigate(
                `/dashboard/projects/${projectSlug}/files/${resource.file.id}/view`
            );
            return;
        }

        navigate(
            `/dashboard/projects/${projectSlug}/resources/${resource.id}`
        );
    };

    return (
        <div
            className="
                flex items-center gap-4
                border-b last:border-b-0
                px-4 py-3
                transition-colors
                hover:bg-muted
            "
            onClick={handleClick}
        >
            <div
                className="
                    relative
                    flex size-12 shrink-0
                    items-center justify-center
                    overflow-hidden
                    rounded-md
                    bg-muted
                    text-muted-foreground
                "
            >
                {icon}

                {thumbnail && (
                    <img
                        src={thumbnail}
                        alt=""
                        className="
                            absolute
                            inset-0
                            size-full
                            object-cover
                            opacity-0
                            transition-opacity
                            duration-150
                        "
                        onLoad={(event) => {
                            event.currentTarget.classList.remove(
                                "opacity-0"
                            );

                            event.currentTarget.classList.add(
                                "opacity-100"
                            );
                        }}
                        onError={(event) => {
                            event.currentTarget.remove();
                        }}
                    />
                )}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                    {resource.name}
                </p>

                <p
                    className="
                        truncate
                        text-sm
                        text-muted-foreground
                    "
                >
                    {subtitle}
                </p>
            </div>

            {resource.type === "file" &&
                resource.file && (
                    <div
                        className="
                            hidden
                            text-sm
                            text-muted-foreground
                            sm:block
                        "
                    >
                        {formatBytes(
                            resource.file.size
                        )}
                    </div>
                )}

            <div
                className="
                    hidden
                    text-sm
                    text-muted-foreground
                    md:block
                "
            >
                {formatDate(resource.createdAt)}
            </div>

            <ResourceActions
                resource={resource}
                projectSlug={projectSlug}
                handleOpen={() => handleClick()}
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