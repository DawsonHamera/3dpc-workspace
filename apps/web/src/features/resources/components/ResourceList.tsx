import type { Resource } from "../types";
import { ResourceListItem } from "./ResourceListItem";

type Props = {
    resources: Resource[];
    projectSlug: string;
};

export function ResourceList({
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
        <div className="overflow-hidden rounded-lg border">
            {resources.map((resource) => (
                <ResourceListItem
                    key={resource.id}
                    resource={resource}
                    projectSlug={projectSlug}
                />
            ))}
        </div>
    );
}