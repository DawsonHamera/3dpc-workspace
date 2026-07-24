import {
    CalendarDays,
    FolderKanban,
    MessageSquare,
    Users,
    ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";


export default function GuestSplashPage() {

    const navigate = useNavigate();


    const features = [
        {
            title: "Projects",
            description:
                "View club projects, files, designs, and member creations.",
            icon: FolderKanban,
            action: () => navigate("/dashboard/projects"),
        },
        {
            title: "Events",
            description:
                "Keep track of meetings, workshops, and upcoming activities.",
            icon: CalendarDays,
            action: () => navigate("/calendar"),
        },
        {
            title: "Community",
            description:
                "Connect with members and stay updated with club announcements.",
            icon: Users,
            action: () => navigate("/dashboard/members"),
        },
        {
            title: "Chat",
            description:
                "Collaborate with other members and discuss projects.",
            icon: MessageSquare,
            action: () => navigate("/dashboard/chat"),
        },
    ];


    return (
        <div className="flex flex-1 flex-col gap-10">

            <section className="space-y-3">

                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome to 3DPC
                </h1>

                <p className="max-w-2xl text-muted-foreground">
                    Your hub for club projects, events, resources, and
                    collaboration. Explore what the club is building and
                    connect with other members.
                </p>

            </section>



            <section className="grid gap-4 md:grid-cols-2">

                {features.map((feature) => {

                    const Icon = feature.icon;

                    return (
                        <Card
                            key={feature.title}
                            className="cursor-pointer transition hover:bg-muted"
                            onClick={feature.action}
                        >

                            <CardHeader>

                                <div className="flex items-center gap-3">

                                    <div className="rounded-lg border p-2">
                                        <Icon className="h-5 w-5" />
                                    </div>


                                    <CardTitle>
                                        {feature.title}
                                    </CardTitle>

                                </div>

                            </CardHeader>


                            <CardContent>

                                <CardDescription>
                                    {feature.description}
                                </CardDescription>


                                <Button
                                    variant="ghost"
                                    className="mt-4 px-0"
                                >
                                    Open
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>

                            </CardContent>

                        </Card>
                    );

                })}

            </section>



            <Card>

                <CardHeader>
                    <CardTitle>
                        Getting Started
                    </CardTitle>

                    <CardDescription>
                        New to the club portal?
                    </CardDescription>
                </CardHeader>


                <CardContent className="space-y-2 text-sm text-muted-foreground">

                    <p>
                        • Check out current projects and designs
                    </p>

                    <p>
                        • Join upcoming meetings and workshops
                    </p>

                    <p>
                        • Explore guides and resources
                    </p>

                </CardContent>

            </Card>


        </div>
    );
}