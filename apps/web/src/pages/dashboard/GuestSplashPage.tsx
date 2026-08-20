import {
    ArrowRight,
    BookOpen,
    CalendarDays,
    FolderKanban,
    ShieldCheck,
    Users,
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
                "Explore what the club is building, including projects, designs, and shared work.",
            icon: FolderKanban,
            action: () => navigate("/projects"),
        },
        {
            title: "Resources",
            description:
                "Browse guides, documentation, and resources created to help members get started.",
            icon: BookOpen,
            action: () => navigate("/dashboard/guides/safety-guide"),
        },
        {
            title: "Events",
            description:
                "See upcoming meetings, workshops, and other club activities.",
            icon: CalendarDays,
            action: () => navigate("/calendar"),
        },
        {
            title: "About the Club",
            description:
                "Learn more about the 3D Printing Club and what members can get involved with.",
            icon: Users,
            action: () => navigate("/"),
        },
    ];

    return (
        <div className="flex flex-1 flex-col gap-8">

            {/* Hero */}
            <section className="rounded-xl border bg-card p-8">

                <div className="max-w-3xl space-y-4">

                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                        <ShieldCheck className="size-6 text-primary" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Welcome to 3DPC Workspace
                        </h1>

                        <p className="text-lg text-muted-foreground">
                            Explore the club's projects, resources, and
                            activities while your workspace access is being
                            set up.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() =>
                            navigate("/dashboard/membership")
                        }
                    >
                        View Membership Status
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                </div>

            </section>


            {/* Explore */}
            <section className="space-y-4">

                <div>
                    <h2 className="text-xl font-semibold">
                        Explore the Workspace
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        There's plenty to explore while you're getting
                        familiar with the club.
                    </p>
                </div>


                <div className="grid gap-4 md:grid-cols-2">

                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <Card
                                key={feature.title}
                                className="cursor-pointer transition-colors hover:bg-muted/50"
                                onClick={feature.action}
                            >
                                <CardHeader>
                                    <div className="flex items-center gap-3">

                                        <div className="flex size-10 items-center justify-center rounded-lg border bg-background">
                                            <Icon className="size-5" />
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
                                        Explore
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}

                </div>

            </section>


            {/* Membership */}
            <Card>

                <CardHeader>
                    <CardTitle>
                        Interested in joining?
                    </CardTitle>

                    <CardDescription>
                        If you're waiting for your membership to be approved,
                        you can check its status and see what's next.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <p className="max-w-2xl text-sm text-muted-foreground">
                        Once your membership is approved, you'll gain access
                        to the full workspace and the tools used by club
                        members.
                    </p>

                    <Button
                        variant="outline"
                        className="shrink-0"
                        onClick={() =>
                            navigate("/dashboard/membership")
                        }
                    >
                        Membership
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                </CardContent>

            </Card>


            {/* Footer */}
            <div className="pb-4 text-center text-sm text-muted-foreground">
                <p>
                    3D Printing Club · 3DPC Workspace
                </p>
            </div>

        </div>
    );
}