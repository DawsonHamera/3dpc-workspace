import { Spinner } from "@/components/ui/spinner";
import { ResourceExplorer } from "@/features/resources/components/ResourcesExplorer";
import { useProjectResources } from "@/features/resources/hooks/useProjectResources";

type Props = {
    project: any;
};

export function ProjectResourcesTab({ project }: Props) {

    const {
        data: resources = [],
        isLoading,
    } = useProjectResources(project.slug);

    if (isLoading) {
        return <Spinner className="mx-auto my-8" />;
    }

    return (
        <ResourceExplorer
            resources={resources}
            projectSlug={project.slug}
        />
    );
}