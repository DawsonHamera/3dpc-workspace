import {
    ArrowRight,
    BookOpen,
    Hammer,
    Lightbulb,
    Printer,
    Users,
    Wrench,
    GraduationCap,
    Recycle,
    MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { QuoteCarousel } from "@/components/custom/QuoteCarousel";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLandingPage from "./MobileLandingPage";

const quotes = [
    {
        quote:
            "I love how the 3DPC is always trying new things and full of creative people. They are very supportive of each other and we laugh A LOT. The club is very organized and consistent with reminders and interesting workshops. 3DPC is the highlight of every football game for me.",
        name: "Elizabeth B.",
        role: "Club Member",
        initials: "EB",
    },
    {
        quote:
            "The 3D Printing Club is fantastic, filled with members who are truly enthusiastic about 3D printing and sharing their knowledge and experience with interested students. It's a great place to go if you're looking into getting or already have a 3D printer and want to connect with other passionate students. Furthermore, the 3DPC is a very active club, with many opportunities to engage with the 3D printing community and learn more about the hobby!",
        name: "Club Treasurer",
        role: "Ethan M.",
        initials: "EM",
    },
];

export default function HomePage() {

    const isMobile = useIsMobile();

    if (isMobile) {
        return <MobileLandingPage />;
    }

    return (
        <div className="min-h-screen bg-background">

            {/* Hero */}
            <section className="container mx-auto grid min-h-[85vh] items-center gap-12 px-6 lg:grid-cols-2">

                <div>

                    <Badge className="mb-6">
                        Everyone is welcome.
                    </Badge>

                    <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">
                        Bring your ideas
                        <br />
                        to life.
                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
                        Whether you've never touched a 3D printer before or you're already
                        designing complex projects, our club is a place to learn,
                        experiment, build, and help others do the same.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <Button size="lg">
                            <Link to="/projects">
                                Explore Projects
                            </Link>
                        </Button>

                        <Button variant="outline" size="lg">
                            <Link to="/register">
                                Join the Club
                            </Link>
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                    </div>

                </div>

                <div className="relative h-[520px] w-full max-w-xl overflow-hidden rounded-3xl">
                    <div className="flex h-full items-center justify-center">
                        <span className="text-muted-foreground">
                            <img src="/images/logo.png" alt="3D Printing Club" className="h-full w-full object-cover" />
                        </span>
                    </div>
                </div>

            </section>

            {/* Three audiences */}

            <section className="border-y bg-muted/40 py-24">

                <div className="container mx-auto px-6">

                    <div className="mb-12 text-center">

                        <h2 className="text-4xl font-bold">
                            There's a place for everyone.
                        </h2>

                        <p className="mt-3 text-muted-foreground">
                            Whether you're just getting started, building something amazing,
                            or simply need a little help.
                        </p>

                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">

                        <Card>

                            <CardContent className="space-y-5 p-8">

                                <GraduationCap className="h-10 w-10 text-primary" />

                                <h3 className="text-2xl font-semibold">
                                    I'm New
                                </h3>

                                <p className="text-muted-foreground">
                                    Learn CAD, discover how 3D printers work, and complete your
                                    first project with guidance from experienced members.
                                </p>

                                <Button variant="secondary">
                                    <Link to="/register">Start Learning</Link>
                                </Button>

                            </CardContent>

                        </Card>

                        <Card>

                            <CardContent className="space-y-5 p-8">

                                <Lightbulb className="h-10 w-10 text-primary" />

                                <h3 className="text-2xl font-semibold">
                                    I Want to Build
                                </h3>

                                <p className="text-muted-foreground">
                                    Join one of our active engineering projects or bring your own
                                    ideas to life using the club's equipment and workspace.
                                </p>

                                <Button variant="secondary">
                                    <Link to="/projects">Browse Projects</Link>
                                </Button>

                            </CardContent>

                        </Card>

                        <Card>

                            <CardContent className="space-y-5 p-8">

                                <Wrench className="h-10 w-10 text-primary" />

                                <h3 className="text-2xl font-semibold">
                                    I Need Help
                                </h3>

                                <p className="text-muted-foreground">
                                    Printer acting up? Need CAD advice? Want another opinion on a
                                    project? Stop by—we're always happy to help.
                                </p>

                                <Button variant="secondary">
                                    <Link to="/contact">Ask for Help</Link>
                                </Button>

                            </CardContent>

                        </Card>

                    </div>

                </div>

            </section>

            {/* Featured Project */}

            <section className="container mx-auto py-24 px-6">

                <Badge className="mb-4">
                    Current Featured Project
                </Badge>

                <Card>

                    <CardContent className="grid gap-10 p-10 lg:grid-cols-2">

                        <div>

                            <h2 className="text-4xl font-bold">
                                Recreator Recycling Project
                            </h2>

                            <p className="mt-6 text-lg text-muted-foreground">
                                Our club is building an open-source machine capable of turning
                                failed prints and plastic waste into brand new filament. It's an
                                ongoing engineering project involving CAD, electronics,
                                fabrication, programming, and sustainability.
                            </p>

                            <Button className="mt-8">
                                Explore Project
                            </Button>

                        </div>

                        <img src="/images/recreator.webp" alt="Recreator" className="rounded-xl bg-muted" />

                    </CardContent>

                </Card>

            </section>

            {/* What We Do */}

            <section className="border-y bg-muted/30 py-24">

                <div className="container mx-auto">

                    <div className="mb-16 text-center">

                        <h2 className="text-4xl font-bold">
                            What can you do here?
                        </h2>

                    </div>

                    <div className="grid gap-6 px-6 md:grid-cols-2 xl:grid-cols-4">

                        {[
                            {
                                icon: Printer,
                                title: "Print",
                                text: "Bring your ideas into the real world."
                            },
                            {
                                icon: BookOpen,
                                title: "Learn",
                                text: "Browse guides written by students."
                            },
                            {
                                icon: Hammer,
                                title: "Build",
                                text: "Work on collaborative engineering projects."
                            },
                            {
                                icon: Users,
                                title: "Collaborate",
                                text: "Meet other makers and creators."
                            },
                            {
                                icon: MessageCircle,
                                title: "Ask Questions",
                                text: "No experience required."
                            },
                            {
                                icon: Wrench,
                                title: "Repair",
                                text: "Get help fixing printers."
                            },
                            {
                                icon: Recycle,
                                title: "Recycle",
                                text: "Help reduce plastic waste."
                            },
                            {
                                icon: Lightbulb,
                                title: "Create",
                                text: "Turn ideas into real projects."
                            }

                        ].map((item) => (

                            <Card key={item.title}>

                                <CardContent className="space-y-4 p-6">

                                    <item.icon className="h-8 w-8 text-primary" />

                                    <h3 className="font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground">
                                        {item.text}
                                    </p>

                                </CardContent>

                            </Card>

                        ))}

                    </div>

                </div>

            </section>

          <QuoteCarousel quotes={quotes} />
            {/* Need Help */}

            <section className="container mx-auto py-24 px-6">

                <div className="mx-auto max-w-4xl text-center">

                    <Badge className="mb-4">
                        Community Support
                    </Badge>

                    <h2 className="text-4xl font-bold">
                        Need help with your own project?
                    </h2>

                    <p className="mt-6 text-lg text-muted-foreground">
                        You don't have to be a club member. Whether you're troubleshooting a
                        printer, learning CAD, designing a replacement part, or simply need
                        advice—we're happy to help.
                    </p>

                    <div className="mt-10 flex justify-center gap-4">

                        <Button size="lg">
                            <Link to="/contact">Ask for Help</Link>
                        </Button>

                        <Button variant="outline" size="lg">
                            <Link to="/calendar">Visit a Meeting</Link>
                        </Button>

                    </div>

                </div>

            </section>

        </div>
    );
}