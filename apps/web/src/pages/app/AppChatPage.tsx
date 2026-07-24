import {
    MessageCircle,
    Construction,
    Bell,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";


export default function AppChatPage() {
    return (
        <div className="space-y-6 px-4 py-6">

            {/* Header */}
            <section>
                <div className="flex items-center gap-3">
                    <MessageCircle className="h-8 w-8 text-primary" />

                    <h1 className="text-3xl font-bold tracking-tight">
                        Chat
                    </h1>
                </div>

                <p className="mt-2 text-muted-foreground">
                    Stay connected with other club members.
                </p>
            </section>


            {/* Under Construction */}
            <Card className="overflow-hidden">

                <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                        <CardTitle>
                            Club Chat
                        </CardTitle>

                        <Badge variant="secondary">
                            In Development
                        </Badge>
                    </div>
                </CardHeader>


                <CardContent className="space-y-6 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Construction className="h-8 w-8 text-primary" />
                    </div>


                    <div className="space-y-2">

                        <h2 className="text-lg font-semibold">
                            Chat is coming soon!
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            We are working on a new way for members to
                            collaborate, share ideas, and stay connected
                            outside of meetings.
                        </p>

                    </div>


                    <div className="rounded-lg border bg-muted/40 p-4 text-left">

                        <div className="flex items-center gap-2 font-medium">
                            <Bell className="h-4 w-4" />
                            Planned Features
                        </div>

                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                            <li>
                                • Project discussions
                            </li>
                            <li>
                                • Club announcements
                            </li>
                            <li>
                                • Member conversations
                            </li>
                            <li>
                                • Sharing ideas and updates
                            </li>
                        </ul>

                    </div>

                </CardContent>

            </Card>

        </div>
    );
}