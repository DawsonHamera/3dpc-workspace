import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function ProjectActivityTab() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Activity Timeline
                </CardTitle>

                <CardDescription>
                    Complete audit history coming soon.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex h-72 items-center justify-center">

                <p className="text-muted-foreground">
                    Timeline Placeholder
                </p>

            </CardContent>

        </Card>
    );
}