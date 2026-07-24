import {
    ShieldCheck,
    Users,
    ArrowRight,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function MembershipPage() {
   const {data: user} = useAuth();

    const roles = [
        {
            name: "Owner",
            description:
                "Full administrative access to manage the club, members, settings, and system configuration.",
        },
        {
            name: "Admin",
            description:
                "Help manage club operations, members, projects, and shared resources.",
        },
        {
            name: "Member",
            description:
                "Participate in projects, access resources, and collaborate with other club members.",
        },
        {
            name: "Guest",
            description:
                "Limited access to participate in projects and access resources.",
        },
    ];

    return (
        <div className="container mx-auto space-y-8 px-6 py-12">

            <section>
                <div className="flex items-center gap-4">
                    <Users className="h-10 w-10" />

                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">
                            Membership
                        </h1>

                        <p className="mt-2 text-muted-foreground">
                            View your club membership and learn about available roles.
                        </p>
                    </div>
                </div>
            </section>


            <Card>
                <CardHeader>
                    <CardTitle>
                        Your Membership
                    </CardTitle>

                    <CardDescription>
                        Your current role and access level within the club.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex items-start justify-between gap-4 rounded-lg border p-5">

                        <div className="space-y-2">

                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5" />

                                <h2 className="font-semibold">
                                    {user?.role.name}
                                </h2>

                                <Badge>
                                    Current
                                </Badge>
                            </div>


                            <p className="text-sm text-muted-foreground">
                                {user?.role.description}
                            </p>

                        </div>

                    </div>
                </CardContent>
            </Card>



            <Card>
                <CardHeader>
                    <CardTitle>
                        Club Roles
                    </CardTitle>

                    <CardDescription>
                        Different membership levels and their responsibilities.
                    </CardDescription>
                </CardHeader>


                <CardContent className="space-y-4">

                    {roles.map((role) => (
                        <div
                            key={role.name}
                            className="rounded-lg border p-4"
                        >
                            <h3 className="font-medium">
                                {role.name}
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {role.description}
                            </p>
                        </div>
                    ))}

                </CardContent>
            </Card>



            <Card>
                <CardHeader>
                    <CardTitle>
                        Request Membership Changes
                    </CardTitle>

                    <CardDescription>
                        Need additional permissions or want to help manage the club?
                    </CardDescription>
                </CardHeader>


                <CardContent className="flex flex-col gap-4">

                    <p className="text-sm text-muted-foreground">
                        Membership upgrades are reviewed by club leadership.
                        Submit a request and an administrator will review your account.
                    </p>


                    <Button className="w-fit" disabled>
                        Request Change
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                </CardContent>
            </Card>

        </div>
    );
}