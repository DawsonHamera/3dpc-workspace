import { ProjectMembersTable } from "../ProjectMembersTable";

type Props = {
    project: any;
};

export function ProjectMembersTab({ project }: Props) {
    return (
        <ProjectMembersTable
            members={project.members}
        />
    );
}