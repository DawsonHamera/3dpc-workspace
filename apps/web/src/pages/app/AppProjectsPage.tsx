import { FolderKanban, Users } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { useProjects } from "@/features/projects/useProjects";


export default function AppProjectsPage() {
    const {
        data: projects,
        isLoading,
    } = useProjects();


    return (
        <div className="space-y-6 px-4 py-6">

            {/* Header */}
            <section>
                <div className="flex items-center gap-2">
                    <FolderKanban className="h-7 w-7 text-primary" />

                    <h1 className="text-3xl font-bold tracking-tight">
                        Projects
                    </h1>
                </div>

                <p className="mt-2 text-muted-foreground">
                    See what members are building and help bring ideas to life.
                </p>
            </section>


            {/* Loading */}
            {isLoading && (
                <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-5 w-2/3" />
                            </CardHeader>

                            <CardContent>
                                <Skeleton className="h-12 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}


            {/* Projects */}
            {!isLoading && projects && projects.length > 0 && (
                <div className="space-y-4">

                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            className="transition active:scale-[0.99]"
                        >
                            <CardHeader className="space-y-3">

                                <div className="flex items-start justify-between gap-3">

                                    <CardTitle className="text-lg">
                                        {project.name}
                                    </CardTitle>

                                    <Badge
                                        variant={
                                            project.status === "active"
                                                ? "default"
                                                : "secondary"
                                        }
                                    >
                                        {project.status}
                                    </Badge>

                                </div>

                            </CardHeader>


                            <CardContent className="space-y-4">

                                <p className="line-clamp-3 text-sm text-muted-foreground">
                                    {project.shortDescription ||
                                        project.description ||
                                        "No description available."}
                                </p>


                                <div className="flex items-center justify-between text-sm text-muted-foreground">

                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />

                                        <span>
                                            Members
                                        </span>
                                    </div>


                                    <span>
                                        {new Date(
                                            project.createdAt
                                        ).toLocaleDateString()}
                                    </span>

                                </div>

                            </CardContent>
                        </Card>
                    ))}

                </div>
            )}


            {/* Empty */}
            {!isLoading && (!projects || projects.length === 0) && (
                <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                        No projects available yet.
                    </CardContent>
                </Card>
            )}

        </div>
    );
}