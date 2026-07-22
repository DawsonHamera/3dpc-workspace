import { ProjectFilesTable } from "@/components/project-files-table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProjectBySlug } from "@/features/projects/useProjectBySlug";
import { formatBytes, formatDate } from "@/lib/helpers";
import { Button } from "@base-ui/react";
import { FolderIcon, KeyIcon } from "lucide-react";
import { useParams } from "react-router-dom";

export const ProjectPanel = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: projectData, isLoading: isProjectLoading } = useProjectBySlug(slug || "");

    const totalStorage = projectData?.files.reduce((acc, file) => acc + file.size, 0) || 0;

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
