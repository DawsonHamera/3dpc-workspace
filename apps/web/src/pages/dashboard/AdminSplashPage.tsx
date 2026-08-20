import {
    Activity,
    ArrowRight,
    FileText,
    FolderKanban,
    Plus,
    RefreshCw,
    ShieldCheck,
    Users,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CreateProjectDialog } from "@/features/projects/components/NewProjectDialog";
import { useAuditLogs } from "@/features/audit/hooks/useAuditLogs";
import { useProjects } from "@/features/projects/useProjects";

function formatDate(date: string | Date) {
    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
        return "";
    }

    return value.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatAction(action: string) {
    return action
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}

export default function AdminSplashPage() {
    const navigate = useNavigate();

    const [newProjectOpen, setNewProjectOpen] = useState(false);

    const {
        data: projects = [],
        isLoading: projectsLoading,
        isFetching: projectsFetching,
        refetch: refetchProjects,
    } = useProjects();

    const {
        data: logs = [],
        isLoading: logsLoading,
        isFetching: logsFetching,
        refetch: refetchLogs,
    } = useAuditLogs();

    const recentLogs = logs.slice(0, 6);

    const fileEvents = logs.filter(
        log => log.resourceType === "file"
    ).length;

    const projectEvents = logs.filter(
        log => log.resourceType === "project"
    ).length;

    const refresh = () => {
        refetchProjects();
        refetchLogs();
    };

    const isRefreshing =
        projectsFetching || logsFetching;

    return (
        <div className="h-full overflow-auto">
            <div className="container mx-auto space-y-8 px-6 py-8">

                {/* Header */}
                <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Workspace Overview
                        </h1>

                        <p className="text-muted-foreground">
                            Manage projects, monitor activity, and keep the
                            workspace organized.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={refresh}
                            disabled={isRefreshing}
                        >
                            <RefreshCw
                                className={`mr-2 h-4 w-4 ${
                                    isRefreshing
                                        ? "animate-spin"
                                        : ""
                                }`}
                            />

                            Refresh
                        </Button>

                        <Button
                            onClick={() =>
                                setNewProjectOpen(true)
                            }
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Button>
                    </div>

                    <CreateProjectDialog
                        open={newProjectOpen}
                        onOpenChange={setNewProjectOpen}
                    />
                </section>


                {/* Overview */}
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                <FolderKanban className="h-4 w-4" />
                                Projects
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            {projectsLoading ? (
                                <Spinner />
                            ) : (
                                <p className="text-3xl font-bold">
                                    {projects.length}
                                </p>
                            )}
                        </CardContent>
                    </Card>


                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                <Activity className="h-4 w-4" />
                                Activity
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            {logsLoading ? (
                                <Spinner />
                            ) : (
                                <p className="text-3xl font-bold">
                                    {logs.length}
                                </p>
                            )}
                        </CardContent>
                    </Card>


                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                <FileText className="h-4 w-4" />
                                File Events
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            {logsLoading ? (
                                <Spinner />
                            ) : (
                                <p className="text-3xl font-bold">
                                    {fileEvents}
                                </p>
                            )}
                        </CardContent>
                    </Card>


                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                <ShieldCheck className="h-4 w-4" />
                                Project Events
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            {logsLoading ? (
                                <Spinner />
                            ) : (
                                <p className="text-3xl font-bold">
                                    {projectEvents}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                </section>


                {/* Projects */}
                <section className="space-y-4">

                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Projects
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Manage and access workspace projects.
                            </p>
                        </div>

                        <Button
                            variant="ghost"
                            onClick={() =>
                                navigate("/projects")
                            }
                        >
                            View all
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>


                    {projectsLoading ? (
                        <div className="flex justify-center py-12">
                            <Spinner />
                        </div>
                    ) : projects.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <FolderKanban className="mb-4 h-10 w-10 text-muted-foreground" />

                                <h3 className="font-medium">
                                    No projects yet
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Create the first project for the workspace.
                                </p>

                                <Button
                                    className="mt-4"
                                    onClick={() =>
                                        setNewProjectOpen(true)
                                    }
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Project
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {projects.slice(0, 6).map(project => (
                                <Card
                                    key={project.id}
                                    className="group transition-colors hover:border-primary/40"
                                >
                                    <CardHeader>
                                        <CardTitle>
                                            {project.name}
                                        </CardTitle>

                                        <CardDescription>
                                            {project.description ||
                                                "Workspace project"}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() =>
                                                navigate(
                                                    `/dashboard/projects/${project.slug}`
                                                )
                                            }
                                        >
                                            Open Project
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                </section>


                {/* Activity + Admin shortcuts */}
                <section className="grid gap-6 lg:grid-cols-3">

                    {/* Activity */}
                    <Card className="lg:col-span-2">

                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>
                                        Recent Activity
                                    </CardTitle>

                                    <CardDescription>
                                        Recent changes and administrative
                                        activity across the workspace.
                                    </CardDescription>
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={() =>
                                        navigate("/dashboard/logs")
                                    }
                                >
                                    View all
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>


                        <CardContent>
                            {logsLoading ? (
                                <div className="flex justify-center py-10">
                                    <Spinner />
                                </div>
                            ) : recentLogs.length === 0 ? (
                                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                                    No activity yet.
                                </div>
                            ) : (
                                <div className="divide-y">
                                    {recentLogs.map(log => (
                                        <div
                                            key={log.id}
                                            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                    <Activity className="size-4" />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-medium">
                                                        {formatAction(
                                                            log.action
                                                        )}
                                                    </p>

                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {log.resourceType}
                                                        {log.resourceId
                                                            ? ` · ${log.resourceId}`
                                                            : ""}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="shrink-0 text-xs text-muted-foreground">
                                                {formatDate(
                                                    log.createdAt
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>

                    </Card>


                    {/* Admin shortcuts */}
                    <Card>

                        <CardHeader>
                            <CardTitle>
                                Administration
                            </CardTitle>

                            <CardDescription>
                                Quick access to workspace administration.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-3">

                            <Button
                                variant="outline"
                                className="h-auto justify-start py-4"
                                onClick={() =>
                                    navigate("/dashboard/manage/users")
                                }
                            >
                                <Users className="mr-4 h-5 w-5" />

                                <div className="text-left">
                                    <p className="font-medium">
                                        User Management
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        Manage workspace members
                                    </p>
                                </div>

                                <ArrowRight className="ml-auto h-4 w-4" />
                            </Button>


                            <Button
                                variant="outline"
                                className="h-auto justify-start py-4"
                                onClick={() =>
                                    navigate("/dashboard/logs")
                                }
                            >
                                <Activity className="mr-4 h-5 w-5" />

                                <div className="text-left">
                                    <p className="font-medium">
                                        Activity Logs
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        Review workspace activity
                                    </p>
                                </div>

                                <ArrowRight className="ml-auto h-4 w-4" />
                            </Button>

                        </CardContent>

                    </Card>

                </section>

            </div>
        </div>
    );
}