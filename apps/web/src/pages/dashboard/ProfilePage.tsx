import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CalendarDays,
    Printer,
    FolderOpen,
    Mail,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getFileUrl } from "@/lib/helpers";
import { Spinner } from "@/components/ui/spinner";
import { getInitials } from "@/features/users/components/NavUser";
import { useGetUserDetails } from "@/features/users/hooks/useGetUserDetails";


export default function ProfilePage() {

    const { data: userDetails, isLoading } = useGetUserDetails();

    if (isLoading) {
        return <Spinner />;
    }

    if (!userDetails && !isLoading) {
        return (
            <div className="container mx-auto max-w-5xl px-6 py-10">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">
                        User not found
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Please log in to view your profile.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-5xl px-6 py-10">

            {/* Hero */}
            <div className="relative">
                <div
                    className="
            h-48
            rounded-xl
            bg-gradient-to-r
            from-primary/20
            via-primary/10
            to-background
        "
                />

                {/* Avatar */}
                <div
                    className="
            absolute
            -bottom-16
            left-8
            flex
            size-32
            items-center
            justify-center
            overflow-hidden
            rounded-full
            border-4
            border-background
            bg-muted
        "
                >
                    {userDetails?.avatarId ? (
                        <img
                            src={getFileUrl(userDetails.avatarId)}
                            alt={userDetails.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span className="text-4xl font-semibold text-muted-foreground">
                            {getInitials(userDetails?.name)}
                        </span>
                    )}
                </div>
            </div>


            {/* Header */}
            <div className="mt-20 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        {userDetails?.name}
                    </h1>

                    <div className="mt-2 flex gap-2">
                        <Badge>
                            {userDetails?.role?.name}
                        </Badge>

                        <Badge variant="secondary">
                            {userDetails?.grade}
                        </Badge>
                    </div>
                </div>


                {/* <Button>
                    Edit Profile
                </Button> */}

            </div>


            <div className="mt-8 grid gap-6 md:grid-cols-3">

                {/* <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <FolderOpen className="h-5 w-5" />
                            Projects
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            12
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Designs contributed
                        </p>
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Printer className="h-5 w-5" />
                            Prints
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            48
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Completed prints
                        </p>
                    </CardContent>
                </Card> */}


                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <CalendarDays className="h-5 w-5" />
                            Member Since
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="font-medium">
                            {new Date(userDetails?.createdAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </CardContent>
                </Card>

            </div>


            <div className="mt-8 grid gap-6 md:grid-cols-2">

                <Card>
                    <CardHeader>
                        <CardTitle>
                            About
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-muted-foreground">
                            {userDetails.bio}
                        </p>
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader>
                        <CardTitle>
                            Contact
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">

                        <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4" />
                            {userDetails.email}
                        </div>

                    </CardContent>
                </Card>

            </div>

        </div>
    );
}