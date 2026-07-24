import {
    CalendarDays,
    BookOpen,
    Box,
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


export default function SplashPage() {

    const navigate = useNavigate();


    const features = [
        {
            title: "Explore Club Projects",
            description:
                "See what the club has built and get inspired by member creations.",
            icon: Box,
        },
        {
            title: "Learn 3D Printing",
            description:
                "Access guides, resources, and documentation to start learning.",
            icon: BookOpen,
        },
        {
            title: "Stay Updated",
            description:
                "Keep up with meetings, events, workshops, and club activities.",
            icon: CalendarDays,
        },
        {
            title: "Join the Community",
            description:
                "Become a member to collaborate, create, and contribute to projects.",
            icon: Users,
        },
    ];


    return (
        <div className="flex flex-1 flex-col gap-10">

            {/* Hero */}
            <section className="rounded-xl border bg-card p-8">

                <div className="max-w-3xl space-y-4">

                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome to the 3D Printing Club Portal
                    </h1>


                    <p className="text-muted-foreground">
                        You're currently exploring the guest area of the
                        club portal. Request membership to unlock projects,
                        collaboration tools, file sharing, and more.
                    </p>


                    <Button
                        onClick={() =>
                            navigate("/dashboard/membership")
                        }
                    >
                        Request Membership
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                </div>

            </section>



            {/* Guest Features */}
            <section className="space-y-4">

                <div>
                    <h2 className="text-2xl font-bold">
                        What You Can Explore
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Available while waiting for membership approval.
                    </p>
                </div>


                <div className="grid gap-4 md:grid-cols-2">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (
                            <Card key={feature.title}>

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

                                </CardContent>

                            </Card>
                        );

                    })}

                </div>

            </section>



            {/* Membership Explanation */}
            <Card>

                <CardHeader>
                    <CardTitle>
                        Why Become a Member?
                    </CardTitle>

                    <CardDescription>
                        Unlock the full club experience.
                    </CardDescription>
                </CardHeader>


                <CardContent className="space-y-3 text-sm text-muted-foreground">

                    <p>
                        Members can participate in club projects, upload
                        designs, collaborate with other students, and use
                        club resources.
                    </p>

                    <p>
                        Once your request is approved, you'll gain access
                        to the full dashboard experience.
                    </p>

                    <Button
                        variant="outline"
                        onClick={() =>
                            navigate("/dashboard/membership")
                        }
                    >
                        View Membership Status
                    </Button>

                </CardContent>

            </Card>

        </div>
    );
}