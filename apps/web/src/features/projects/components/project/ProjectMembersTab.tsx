import { useProject } from "../../context/ProjectContext";
import { ProjectMembersTable } from "../ProjectMembersTable";

export function ProjectMembersTab() {

    const { project } = useProject();

    return (
        <ProjectMembersTable
            members={project.members}
            projectSlug={project.slug}
        />
    );
}