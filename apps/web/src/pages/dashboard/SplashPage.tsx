import {
    Box,
    FolderKanban,
    Plus,
    Upload,
    Users,
    Clock3,
    FileText,
    ArrowRight,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { CreateProjectDialog } from "@/features/projects/components/NewProjectDialog";

export default function SplashPage() {
    const [newProjectOpen, setNewProjectOpen] = useState(false);

    return (
        <div className="h-full p-6">
            <div className="grid h-full gap-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Welcome back
                        </h1>
                        <p className="text-muted-foreground">
                            Start building your first project workspace.
                        </p>
                    </div>

                    <Button onClick={() => setNewProjectOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Project
                    </Button>
                    <CreateProjectDialog
                        open={newProjectOpen}
                        onOpenChange={setNewProjectOpen}
                    />
                </div>


                {/* Main grid */}
                <div className="
                    grid
                    flex-1
                    gap-6
                    lg:grid-cols-3
                ">

                    {/* Hero */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="
                                flex
                                items-center
                                gap-4
                            ">
                                <div className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-primary/10
                                ">
                                    <Box className="h-7 w-7 text-primary" />
                                </div>

                                <div>
                                    <CardTitle>
                                        Your workspace is empty
                                    </CardTitle>

                                    <CardDescription>
                                        Create a project to start organizing
                                        files, members, and resources.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="grid gap-4">

                            <div className="
                                grid
                                gap-4
                                md:grid-cols-2
                            ">
                                <Button
                                    variant="outline"
                                    className="h-24 justify-start"
                                >
                                    <FolderKanban className="mr-4 h-6 w-6" />
                                    <div className="text-left">
                                        <p className="font-medium">
                                            Create Project
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Start a new workspace
                                        </p>
                                    </div>
                                </Button>


                                <Button
                                    variant="outline"
                                    className="h-24 justify-start"
                                >
                                    <Upload className="mr-4 h-6 w-6" />
                                    <div className="text-left">
                                        <p className="font-medium">
                                            Upload Files
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Add existing resources
                                        </p>
                                    </div>
                                </Button>
                            </div>


                            <div className="rounded-lg border p-4">
                                <div className="mb-2 flex justify-between">
                                    <span className="text-sm font-medium">
                                        Getting started
                                    </span>

                                    <span className="text-sm text-muted-foreground">
                                        0 / 4
                                    </span>
                                </div>

                                <Progress value={0} />

                                <div className="
                                    mt-4
                                    grid
                                    gap-2
                                    text-sm
                                ">
                                    <div className="flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        Create your first project
                                    </div>

                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        Invite members
                                    </div>

                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <FileText className="h-4 w-4" />
                                        Add documentation
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                    </Card>



                    {/* Right side */}
                    <div className="grid gap-6">

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Workspace Overview
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="grid gap-4">

                                <div className="flex items-center justify-between">
                                    <span className="flex gap-2 text-sm">
                                        <FolderKanban className="h-4 w-4" />
                                        Projects
                                    </span>
                                    <span className="font-bold">
                                        1
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="flex gap-2 text-sm">
                                        <FileText className="h-4 w-4" />
                                        Files
                                    </span>
                                    <span className="font-bold">
                                        12
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="flex gap-2 text-sm">
                                        <Users className="h-4 w-4" />
                                        Members
                                    </span>
                                    <span className="font-bold">
                                        2
                                    </span>
                                </div>

                            </CardContent>
                        </Card>


                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="
                                    flex
                                    h-32
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-dashed
                                    text-sm
                                    text-muted-foreground
                                ">
                                    <div className="flex items-center gap-2">
                                        <Clock3 className="h-4 w-4" />
                                        No activity yet
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                </div>


                {/* Bottom card */}
                <Card>
                    <CardContent className="
                        flex
                        items-center
                        justify-between
                        py-4
                    ">
                        <div>
                            <p className="font-medium">
                                Need help getting started?
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Learn how projects, files, and collaboration work.
                            </p>
                        </div>

                        <Button variant="ghost">
                            View Guide
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}