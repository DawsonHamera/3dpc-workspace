import {
    ArrowRight,
    BookOpen,
    FolderKanban,
    KeyRound,
    Printer,
    UserRound,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import AdminSplashPage from "./AdminSplashPage";
import GuestSplashPage from "./GuestSplashPage";

export default function SplashPage() {
    const navigate = useNavigate();

    const { data: user } = useAuth();

    if (user?.role.name === "admin" || user?.role.name === "owner") {
        return <AdminSplashPage />;
    }

    if (user?.role.name === "guest") {
        return <GuestSplashPage />;
    }

    return (
        <div className="h-full p-6">
            <div className="mx-auto flex h-full max-w-6xl flex-col gap-6">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome to 3DPC Workspace
                    </h1>

                    <p className="mt-1 text-muted-foreground">
                        Your central place for club projects, files,
                        resources, and equipment.
                    </p>
                </div>

                {/* Account setup */}
                <Card>
                    <CardHeader>
                        <CardTitle>Get your account ready</CardTitle>

                        <CardDescription>
                            Take a couple of minutes to make sure your
                            account is ready to use.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-3 md:grid-cols-2">

                        {/* Password */}
                        <div className="flex items-center gap-4 rounded-lg border p-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <KeyRound className="size-5 text-primary" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="font-medium">
                                    Set your password
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Replace your temporary password with
                                    one of your own.
                                </p>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    navigate("/dashboard/account?highlight=password-reset")
                                }
                            >
                                Open
                                <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </div>

                        {/* Profile */}
                        <div className="flex items-center gap-4 rounded-lg border p-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <UserRound className="size-5 text-primary" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="font-medium">
                                    Set up your profile
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Add a profile picture so members can
                                    recognize you.
                                </p>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    navigate("/dashboard/account?highlight=profile-picture")
                                }
                            >
                                Open
                                <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </div>

                    </CardContent>
                </Card>

                {/* Explore */}
                <div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">
                            Explore the workspace
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Take a look around and see what the club is
                            working on.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">

                        {/* Resources */}
                        <Card>
                            <CardHeader>
                                <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10">
                                    <BookOpen className="size-6 text-primary" />
                                </div>

                                <CardTitle>Resources</CardTitle>

                                <CardDescription>
                                    Read club guides, documentation, and
                                    other useful reference material.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        navigate(
                                            "/dashboard/guides/printer-guide"
                                        )
                                    }
                                >
                                    Browse resources
                                    <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Projects */}
                        <Card>
                            <CardHeader>
                                <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10">
                                    <FolderKanban className="size-6 text-primary" />
                                </div>

                                <CardTitle>Projects</CardTitle>

                                <CardDescription>
                                    See what the club is currently
                                    building and working on.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        navigate(
                                            "/projects/recreator-filament-recycling"
                                        )
                                    }
                                >
                                    View project
                                    <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Printers */}
                        <Card>
                            <CardHeader>
                                <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10">
                                    <Printer className="size-6 text-primary" />
                                </div>

                                <CardTitle>Printers</CardTitle>

                                <CardDescription>
                                    Explore the club's printers and
                                    available equipment.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        navigate("/dashboard/printers")
                                    }
                                >
                                    View printers
                                    <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </CardContent>
                        </Card>

                    </div>
                </div>

                {/* Footer */}
                <Card className="mt-auto">
                    <CardContent className="flex items-center justify-between gap-4 py-4">
                        <div>
                            <p className="font-medium">
                                Ready to get started?
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Jump into a project or explore the club's
                                resources and equipment.
                            </p>
                        </div>

                        <Button
                            variant="ghost"
                            onClick={() =>
                                navigate(
                                    "/projects/REPLACE_WITH_PROJECT_ID"
                                )
                            }
                        >
                            View project
                            <ArrowRight className="ml-2 size-4" />
                        </Button>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}