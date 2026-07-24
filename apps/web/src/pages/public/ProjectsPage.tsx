import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Folder, Star } from "lucide-react";
import { usePublicProjects } from "@/features/projects/usePublicProjects";

export default function ProjectsPage() {
    const { data: projects, isLoading } = usePublicProjects();

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="mb-10 space-y-3">
                <div className="flex items-center gap-3">
                    <Folder className="h-10 w-10" />

                    <h1 className="text-4xl font-bold tracking-tight">
                        Projects
                    </h1>
                </div>

                <p className="max-w-2xl text-muted-foreground">
                    Explore the projects our members have created and contributed to.
                </p>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-6">
                                <Skeleton className="h-6 w-1/3" />
                                <Skeleton className="mt-4 h-12 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : projects && projects.length > 0 ? (
                <div className="space-y-4">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            className="transition hover:shadow-sm"
                        >
                            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-xl font-semibold">
                                            {project.name}
                                        </h2>

                                        {project.isFeatured === 1 && (
                                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        )}
                                    </div>

                                    <p className="max-w-3xl text-muted-foreground">
                                        {project.shortDescription ||
                                            project.description ||
                                            "No description provided."}
                                    </p>

                                    {project.description &&
                                        project.shortDescription &&
                                        project.description !== project.shortDescription && (
                                            <p className="text-sm text-muted-foreground">
                                                {project.description}
                                            </p>
                                        )}
                                </div>

                                <div className="flex shrink-0 flex-wrap gap-2 md:flex-col md:items-end">

                                    {project.visibility === "public" && (
                                        <Badge variant="outline">
                                            Public
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                        No projects have been published yet.
                    </CardContent>
                </Card>
            )}
        </div>
    );
}