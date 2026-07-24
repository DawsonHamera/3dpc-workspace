import { Link } from "react-router-dom";
import {
    ArrowRight,
    CalendarDays,
    FolderKanban,
    Images,
    MessagesSquare,
    Mail,
    Printer,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePublicProjects } from "@/features/projects/usePublicProjects";

export default function MobileLandingPage() {
    const { data: projects } = usePublicProjects();

    const featured = projects?.slice(0, 2) ?? [];

    return (
        <div className="pb-12">

            {/* Hero */}

            <section className="px-6 pt-12">
                <div className="space-y-5">

                    <div className="flex justify-center">
                        <img
                            src="/images/logo-transparent.png"
                            alt="3D Printing Club"
                            className="h-28 w-28 object-contain"
                        />
                    </div>

                    <div className="space-y-3 text-center">
                        <h1 className="text-4xl font-bold">
                            3D Printing Club
                        </h1>

                        <p className="text-muted-foreground">
                            Learn CAD, explore 3D printing, and turn your ideas
                            into real projects alongside other students.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link
                            to="/login"
                            className={buttonVariants({
                                variant: "default",
                                size: "lg",
                                className: "flex items-center justify-center gap-2",
                            })}>
                            Join Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>

                        <Link
                            to="/contact"
                            className={buttonVariants({
                                variant: "outline",
                                size: "lg",
                            })}
                        >
                            Contact Us
                        </Link>
                    </div>

                </div>
            </section>

            <Separator className="my-10" />

            {/* Quick Links */}

            <section className="px-6">
                <h2 className="mb-5 text-xl font-semibold">
                    Explore
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <QuickLink
                        icon={FolderKanban}
                        title="Projects"
                        to="/projects"
                    />

                    <QuickLink
                        icon={CalendarDays}
                        title="Calendar"
                        to="/calendar"
                    />

                    <QuickLink
                        icon={MessagesSquare}
                        title="Q&A"
                        to="/qa"
                    />

                    <QuickLink
                        icon={Images}
                        title="Gallery"
                        to="/gallery"
                    />

                </div>
            </section>

            <Separator className="my-10" />

            {/* About */}

            <section className="px-6">
                <div className="space-y-4">

                    <div className="flex items-center gap-3">
                        <Printer className="h-6 w-6 text-accent" />

                        <h2 className="text-xl font-semibold">
                            About the Club
                        </h2>
                    </div>

                    <p className="leading-7 text-muted-foreground">
                        The Del Oro High School 3D Printing Club is a place
                        where students can design, build, and learn together.
                        Whether you're completely new or already experienced,
                        everyone is welcome.
                    </p>

                </div>
            </section>

            <Separator className="my-10" />

            {/* Featured Projects */}

            <section className="px-6">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Featured Projects
                    </h2>

                    <Button
                        variant="ghost"
                        size="sm"
                    >
                        <Link to="/projects">
                            View All
                        </Link>
                    </Button>
                </div>

                <div className="space-y-4">
                    {featured.map((project) => (
                        <Card key={project.id}>
                            <CardContent className="space-y-2 p-5">
                                <h3 className="font-semibold">
                                    {project.name}
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    {project.shortDescription ??
                                        project.description ??
                                        "No description available."}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <Separator className="my-10" />

            {/* Join */}

            <section className="px-6">
                <Card>
                    <CardContent className="space-y-4 p-6 text-center">

                        <Mail className="mx-auto h-8 w-8 text-primary" />

                        <div>
                            <h2 className="text-xl font-semibold">
                                Interested?
                            </h2>

                            <p className="mt-2 text-sm text-muted-foreground">
                                We'd love to meet you! Come visit a meeting,
                                ask a question, or learn more about joining the
                                club.
                            </p>
                        </div>
                        <Link
                            to="/contact"
                            className={buttonVariants({
                                size: "lg",
                                className: "w-full",
                            })}
                        >
                            Contact Us
                        </Link>
                    </CardContent>
                </Card>
            </section>

        </div>
    );
}

interface QuickLinkProps {
    icon: React.ElementType;
    title: string;
    to: string;
}

function QuickLink({
    icon: Icon,
    title,
    to,
}: QuickLinkProps) {
    return (
        <Link to={to}>
            <Card className="transition hover:bg-muted/50 active:scale-[0.98]">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                    <Icon className="h-7 w-7 text-primary" />

                    <span className="font-medium">
                        {title}
                    </span>
                </CardContent>
            </Card>
        </Link>
    );
}