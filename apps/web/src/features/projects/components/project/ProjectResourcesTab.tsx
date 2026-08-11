import { ResourceExplorer } from "@/features/resources/components/ResourcesExplorer";

type Props = {
    project: any;
};

export function ProjectResourcesTab({ project }: Props) {

    return (
        <ResourceExplorer
            projectSlug={project.slug}
        />
    );
}