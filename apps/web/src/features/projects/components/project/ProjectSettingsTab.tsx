import { Delete, Settings } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useProject } from "../../context/ProjectContext";
import { useDeleteProject } from "../../useDeleteProject";
import { DeleteDialog } from "@/components/custom/DeleteDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProjectSettingsTab() {

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const { project } = useProject();

    const deleteProject = useDeleteProject();

    const navigate = useNavigate();

    const handleDeleteProject = async () => {
        if (!project) return;
        
        await deleteProject.mutateAsync({ slug: project.slug });

        navigate("/dashboard");
    }

    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Project Settings
                </CardTitle>

                <CardDescription>
                    Configure this project.
                </CardDescription>

            </CardHeader>

            <CardContent className="flex flex-col gap-4">

                <Button
                    variant="outline"
                    className="justify-start"
                >
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Project Details
                </Button>

                <Button
                    variant="outline"
                    className="justify-start"
                >
                    Transfer Ownership
                </Button>

                <Button
                    onClick={() => setDeleteDialogOpen(true)}
                    variant="destructive"
                    className="justify-start"
                >
                    Delete Project
                </Button>

            </CardContent>
            <DeleteDialog
                open={deleteDialogOpen}
                onConfirm={handleDeleteProject}
                title="Delete Project"
                description="Are you sure you want to delete this project? This action cannot be undone."
                onOpenChange={setDeleteDialogOpen}
            />
        </Card>
    );
}