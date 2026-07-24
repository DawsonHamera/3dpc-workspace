import { ProjectFilesTable } from "@/features/projects/components/ProjectFilesTable";
import { ProjectMembersTable } from "@/features/projects/components/ProjectMembersTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { useProjectBySlug } from "@/features/projects/useProjectBySlug";
import { FolderIcon, KeyIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const ProjectPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: projectData, isLoading: isProjectLoading } = useProjectBySlug(slug || "");

    const navigate = useNavigate();

    if (isProjectLoading) {
        return <Spinner />;
    }

    if (!projectData) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Project not found.
                </p>
            </div>
        );
    }


    return (
        <div className="flex flex-1 flex-col gap-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink onClick={() => navigate("/dashboard")}>
                            Projects
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{projectData.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <h1 className="text-2xl font-bold">
                    {projectData.name}
                </h1>
                <p className="text-muted-foreground">
                    Project ID: {projectData.id}
                </p>
            </div>

            <ProjectFilesTable
                files={projectData.files}
            />

            <ProjectMembersTable members={projectData.members} />

            <Card>
                <CardHeader>
                    <CardTitle>
                        Project Details
                    </CardTitle>
                    <CardDescription>
                        View and manage your project settings.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <Item>
                        <ItemMedia variant="icon">
                            <FolderIcon />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>
                                Project Name
                            </ItemTitle>
                            <ItemDescription>
                                {projectData.name}
                            </ItemDescription>
                        </ItemContent>
                    </Item>
                    <Item>
                        <ItemMedia variant="icon">
                            <KeyIcon />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>
                                Project ID
                            </ItemTitle>
                            <ItemDescription>
                                {projectData.id}
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Button variant="outline">
                                Copy ID
                            </Button>
                        </ItemActions>
                    </Item>
                </CardContent>
            </Card>
        </div>
    );
}
