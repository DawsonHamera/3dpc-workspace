import {
    User,
    Settings,
    LogOut,
    FolderKanban,
    CalendarDays,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { getFileUrl } from "@/lib/helpers";
import { useLogout } from "@/features/auth/hooks/useLogout";


export default function AppProfilePage() {
    const { data: user, isLoading } = useAuth();

    const logout = useLogout();

    const handleLogout = async () => {
        await logout.mutate();
    }

    if (isLoading || !user) {
        return null;
    }


    return (
        <div className="space-y-6 px-4 py-6">

            {/* Profile Header */}
            <section className="flex items-center gap-4">

                <img
                    src={getFileUrl(user.avatarId)}
                    alt="Profile"
                    className="h-20 w-20 rounded-full border object-cover"
                />


                <div>
                    <h1 className="text-2xl font-bold">
                        {user.name}
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        {user.email}
                    </p>

                    <p className="mt-1 text-sm font-medium">
                        {user.role.name}
                    </p>
                </div>

            </section>



            {/* Member Info */}
            <Card>

                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Member Info
                    </CardTitle>
                </CardHeader>


                <CardContent className="space-y-3 text-sm">

                    <div>
                        <p className="text-muted-foreground">
                            Joined
                        </p>

                        <p className="font-medium">
                            Sometime in 2026 (WIP)
                        </p>
                    </div>


                    <Separator />


                    <div>
                        <p className="text-muted-foreground">
                            Membership
                        </p>

                        <p className="font-medium">
                            Active Member
                        </p>
                    </div>

                </CardContent>

            </Card>



            {/* Activity */}
            <div className="grid grid-cols-2 gap-3">

                <Card>
                    <CardContent className="p-4 text-center">

                        <FolderKanban className="mx-auto mb-2 h-5 w-5 text-primary" />

                        <p className="text-xl font-bold">
                            4
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Projects
                        </p>

                    </CardContent>
                </Card>


                <Card>
                    <CardContent className="p-4 text-center">

                        <CalendarDays className="mx-auto mb-2 h-5 w-5 text-primary" />

                        <p className="text-xl font-bold">
                            12
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Events
                        </p>

                    </CardContent>
                </Card>

            </div>



            {/* Actions */}
            <Card>

                <CardHeader>
                    <CardTitle>
                        Account
                    </CardTitle>
                </CardHeader>


                <CardContent className="space-y-3">

                    <Button
                        variant="outline"
                        className="w-full justify-start"
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Button>


                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleLogout()}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>

                </CardContent>

            </Card>

        </div>
    );
}