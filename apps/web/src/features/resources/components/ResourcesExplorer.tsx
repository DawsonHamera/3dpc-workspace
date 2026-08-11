"use client";

import { useMemo, useState } from "react";
import {
    Grid2X2,
    List,
    Plus,
    RefreshCw,
    Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ResourceGrid } from "./ResourceGrid";
import { ResourceList } from "./ResourceList";
import { CreateResourceDialog } from "./CreateResourceDialog";
import { useProjectResources } from "../hooks/useProjectResources";

type Props = {
    projectSlug: string;
};

type ViewMode = "list" | "grid";

export function ResourceExplorer({
    projectSlug,
}: Props) {
    const [search, setSearch] = useState("");
    const [view, setView] = useState<ViewMode[]>(["list"]);
    const [createType, setCreateType] = useState<
        "onshape" | null
    >(null);

    const {
        data: resources = [],
        refetch,
        isFetching,
    } = useProjectResources(projectSlug);

    const filteredResources = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return resources;
        }

        return resources.filter((resource) =>
            resource.name
                .toLowerCase()
                .includes(query)
        );
    }, [resources, search]);

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search
                            className="
                                absolute left-3 top-1/2
                                size-4
                                -translate-y-1/2
                                text-muted-foreground
                            "
                        />

                        <Input
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search resources..."
                            className="pl-9"
                        />
                    </div>

                    <ToggleGroup
                        value={view}
                        onValueChange={(value) => {
                            if (value.length > 0) {
                                setView(
                                    value as ViewMode[]
                                );
                            }
                        }}
                    >
                        <ToggleGroupItem
                            value="list"
                            aria-label="List view"
                        >
                            <List />
                        </ToggleGroupItem>

                        <ToggleGroupItem
                            value="grid"
                            aria-label="Grid view"
                        >
                            <Grid2X2 />
                        </ToggleGroupItem>
                    </ToggleGroup>

                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Refresh resources"
                        onClick={() => refetch()}
                        disabled={isFetching}
                    >
                        {isFetching ? (
                            <Spinner />
                        ) : (
                            <RefreshCw />
                        )}
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button>
                                    <Plus />
                                    Add Resource
                                </Button>
                            }
                        />

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() =>
                                    setCreateType("onshape")
                                }
                            >
                                Onshape Document
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {view[0] === "list" ? (
                    <ResourceList
                        resources={filteredResources}
                        projectSlug={projectSlug}
                    />
                ) : (
                    <ResourceGrid
                        resources={filteredResources}
                        projectSlug={projectSlug}
                    />
                )}
            </div>

            <CreateResourceDialog
                open={createType === "onshape"}
                onOpenChange={(open) => {
                    if (!open) {
                        setCreateType(null);
                    }
                }}
                type={createType}
                projectSlug={projectSlug}
            />
        </>
    );
}