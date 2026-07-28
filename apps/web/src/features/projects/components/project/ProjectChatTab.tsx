import { MessageSquare } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export function ProjectChatTab() {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Project Chat
                </CardTitle>

                <CardDescription>
                    Collaborate with your team in real time.
                </CardDescription>

            </CardHeader>

            <CardContent className="flex h-96 flex-col items-center justify-center gap-4">

                <MessageSquare className="h-16 w-16 text-muted-foreground" />

                <div className="text-center">

                    <h3 className="font-semibold">
                        Coming Soon
                    </h3>

                    <p className="mt-2 text-muted-foreground">
                        Real-time chat will appear here.
                    </p>

                </div>

                <Button disabled>
                    Launch Chat
                </Button>

            </CardContent>

        </Card>
    );
}