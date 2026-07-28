import { Settings } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export function ProjectSettingsTab() {
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
                    variant="destructive"
                    className="justify-start"
                >
                    Delete Project
                </Button>

            </CardContent>

        </Card>
    );
}