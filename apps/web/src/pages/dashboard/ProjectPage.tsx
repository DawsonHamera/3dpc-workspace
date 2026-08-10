import {
    Activity,
    FileText,
    LayoutDashboard,
    MessageSquare,
    Settings,
    Users,
} from "lucide-react";

import { Spinner } from "@/components/ui/spinner";

import { useParams } from "react-router-dom";

import { useProjectBySlug } from "@/features/projects/useProjectBySlug";

import {
    ProjectLayout,
    type ProjectTab,
} from "@/features/projects/components/project/ProjectLayout";

import { ProjectOverviewTab } from "@/features/projects/components/project/ProjectOverviewTab";
import { ProjectResourcesTab } from "@/features/projects/components/project/ProjectResourcesTab";
import { ProjectMembersTab } from "@/features/projects/components/project/ProjectMembersTab";
import { ProjectActivityTab } from "@/features/projects/components/project/ProjectActivityTab";
import { ProjectChatTab } from "@/features/projects/components/project/ProjectChatTab";
import { ProjectSettingsTab } from "@/features/projects/components/project/ProjectSettingsTab";
import { ProjectProvider } from "@/features/projects/context/ProjectContext";

export const ProjectPage = () => {

    const { slug } = useParams<{
        slug: string;
    }>();

    const {
        data: project,
        isLoading,
    } = useProjectBySlug(slug ?? "");

    if (isLoading) {
        return <Spinner />;
    }

    if (!project) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Project not found.
                </p>
            </div>
        );
    }

    const tabs: ProjectTab[] = [
        {
            value: "overview",
            label: "Overview",
            icon: <LayoutDashboard className="h-4 w-4" />,
            content: (
                <ProjectOverviewTab
                    project={project}
                />
            ),
        },
        {
            value: "resources",
            label: "Resources",
            icon: <FileText className="h-4 w-4" />,
            content: (
                <ProjectResourcesTab
                    project={project}
                />
            ),
        },
        {
            value: "members",
            label: "Members",
            icon: <Users className="h-4 w-4" />,
            content: (
                <ProjectMembersTab />
            ),
        },
        {
            value: "activity",
            label: "Activity",
            icon: <Activity className="h-4 w-4" />,
            content: (
                <ProjectActivityTab />
            ),
        },
        {
            value: "chat",
            label: "Chat",
            icon: <MessageSquare className="h-4 w-4" />,
            content: (
                <ProjectChatTab />
            ),
        },
        {
            value: "settings",
            label: "Settings",
            icon: <Settings className="h-4 w-4" />,
            content: (
                <ProjectSettingsTab/>
            ),
        },
    ];

    return (
        <ProjectProvider project={project}>
            <ProjectLayout
                project={project}
                tabs={tabs}
            />
        </ProjectProvider>
    );
};

export default ProjectPage;