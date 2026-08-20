import {
    Activity,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Props = {
    project: any;
};

export function ProjectOverviewTab({ project }: Props) {
    return (
        <div className="grid gap-6 xl:grid-cols-3">

            <Card>

                <CardHeader>
                    <CardTitle>Project Overview</CardTitle>
                    <CardDescription>
                        {project.description || "No description available."}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Project Name
                        </p>

                        <p className="font-medium">
                            {project.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Project ID
                        </p>

                        <p className="font-mono text-xs">
                            {project.id}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Visibility
                        </p>

                        <p>Club Members</p>
                    </div>

                </CardContent>

            </Card>

            <Card className="xl:col-span-2">

                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                        Recent changes to this project.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">

                    {/* {[
                        "Firmware updated",
                        "PCB uploaded",
                        "New member joined",
                    ].map((entry) => (
                        <div
                            key={entry}
                            className="flex gap-3"
                        >
                            <Activity className="mt-1 h-4 w-4 text-primary" />

                            <div>
                                <p>{entry}</p>

                                <p className="text-xs text-muted-foreground">
                                    Placeholder activity
                                </p>
                            </div>

                        </div>
                    ))} */}

                </CardContent>

            </Card>

        </div>
    );
}