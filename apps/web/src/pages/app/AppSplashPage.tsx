import {
    CalendarDays,
    MessageCircle,
    FolderKanban,
    Printer,
    Users,
    Bell,
    Triangle,
    TriangleAlert,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePublicProjects } from "@/features/projects/usePublicProjects";
import { useMemo } from "react";


const upcomingEvent = {
    title: "Weekly Club Meeting",
    date: "Friday, 3:30 PM",
    location: "Engineering Lab",
    description:
        "Work on projects, learn new tools, and collaborate with other members.",
};


const activity = [
    {
        text: "Alex uploaded a new project model",
        time: "10 minutes ago",
    },
    {
        text: "Printer #4 completed a queue job",
        time: "1 hour ago",
    },
    {
        text: "New Q&A question posted",
        time: "Yesterday",
    },
];


export default function AppSplashPage() {

    const { data: publicProjects } = usePublicProjects();

    const featuredProjects = useMemo(() => {
        if (!publicProjects) return [];
        return publicProjects.filter((project) => project.isFeatured).map((project) => ({
            name: project.name,
            status: project.status,
        }));
    }, [publicProjects]);

    return (
        <div className="space-y-6 px-4 py-6">

            {/* Welcome */}
            <section>
                <p className="text-sm text-muted-foreground">
                    Welcome back
                </p>

                <h1 className="text-3xl font-bold tracking-tight">
                    3D Printing Club
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Build. Create. Learn together.
                </p>
            </section>


            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">

                <Link to="/app/projects">
                    <Button
                        variant="outline"
                        className="h-20 w-full flex-col gap-2"
                    >
                        <FolderKanban />
                        Projects
                    </Button>
                </Link>


                <Link to="/app/chat">
                    <Button
                        variant="outline"
                        className="h-20 w-full flex-col gap-2"
                    >
                        <MessageCircle />
                        Chat
                    </Button>
                </Link>


                <Link to="/app/calendar">
                    <Button
                        variant="outline"
                        className="h-20 w-full flex-col gap-2"
                    >
                        <CalendarDays />
                        Calendar
                    </Button>
                </Link>


                <Button
                    variant="outline"
                    className="h-20 flex-col gap-2"
                >
                    <Printer />
                    Printers
                </Button>

            </div>

            <Badge variant="secondary">
                <TriangleAlert className="h-3 w-3" /> Under Construction
            </Badge>

            {/* Upcoming Event */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-primary" />

                        <CardTitle>
                            Upcoming
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="space-y-2">

                    <h3 className="font-semibold">
                        {upcomingEvent.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        {upcomingEvent.date}
                        {" • "}
                        {upcomingEvent.location}
                    </p>

                    <p className="text-sm">
                        {upcomingEvent.description}
                    </p>

                </CardContent>
            </Card>

            <Badge variant="secondary">
                <TriangleAlert className="h-3 w-3" /> Under Construction
            </Badge>

            {/* Activity */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />

                        <CardTitle>
                            Recent Activity
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">

                    {activity.map((item) => (
                        <div
                            key={item.text}
                            className="border-b pb-3 last:border-0"
                        >
                            <p className="text-sm">
                                {item.text}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {item.time}
                            </p>
                        </div>
                    ))}

                </CardContent>
            </Card>

            {/* Projects */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>
                            Featured Projects
                        </CardTitle>

                        <Link
                            to="/app/projects"
                            className="text-sm text-primary"
                        >
                            View
                        </Link>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3">

                    {featuredProjects.map((project) => (
                        <div
                            key={project.name}
                            className="flex items-center justify-between rounded-lg border p-3"
                        >
                            <div>
                                <p className="font-medium">
                                    {project.name}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    1 members
                                </p>
                            </div>

                            <Badge>
                                {project.status}
                            </Badge>
                        </div>
                    ))}

                </CardContent>
            </Card>


            <Badge variant="secondary">
                <TriangleAlert className="h-3 w-3" /> Under Construction
            </Badge>
            {/* Club Stats */}
            <Card>
                <CardContent className="grid grid-cols-3 gap-4 p-5 text-center">

                    <div>
                        <Users className="mx-auto mb-1 h-5 w-5 text-primary" />
                        <p className="font-bold">
                            42
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Members
                        </p>
                    </div>

                    <div>
                        <Printer className="mx-auto mb-1 h-5 w-5 text-primary" />
                        <p className="font-bold">
                            8
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Printers
                        </p>
                    </div>

                    <div>
                        <FolderKanban className="mx-auto mb-1 h-5 w-5 text-primary" />
                        <p className="font-bold">
                            25
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Projects
                        </p>
                    </div>

                </CardContent>
            </Card>


        </div >
    );
}