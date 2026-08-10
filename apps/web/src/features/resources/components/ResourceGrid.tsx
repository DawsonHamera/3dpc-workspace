import type { Resource } from "../types";
import { ResourceCard } from "./ResourceCard";

type Props = {
    resources: Resource[];
    projectSlug: string;
};

export function ResourceGrid({
    resources,
    projectSlug,
}: Props) {
    if (!resources.length) {
        return (
            <div className="rounded-lg border py-16 text-center">
                <p className="text-sm text-muted-foreground">
                    No resources found.
                </p>
            </div>
        );
    }

    return (
        <div className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
        ">
            {resources.map((resource) => (
                <ResourceCard
                    key={resource.id}
                    resource={resource}
                    projectSlug={projectSlug}
                />
            ))}
        </div>
    );
}