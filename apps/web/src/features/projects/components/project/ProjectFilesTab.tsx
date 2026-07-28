import { ProjectFilesTable } from "../ProjectFilesTable";

type Props = {
    project: any;
};

export function ProjectFilesTab({ project }: Props) {
    return (
        <ProjectFilesTable
            files={project.files}
            projectSlug={project.slug}
        />
    );
}