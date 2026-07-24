import {
    Users,
    UserCheck,
    ShieldCheck,
    RefreshCw,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { UsersTable } from "@/features/users/components/UsersTable";
import { useGetUsers } from "@/features/users/hooks/useGetUsers";


export default function ManageUsersPage() {

    const {
        data: users = [],
        isLoading,
        isFetching,
        refetch,
    } = useGetUsers();


    const adminCount = users.filter(
        user => user.role.name.toLowerCase() === "admin"
    ).length;


    const activeCount = users.length;



    return (
        <div className="container mx-auto space-y-8 px-6 py-12">


            {/* Header */}
            <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Manage Users
                    </h1>

                    <p className="text-muted-foreground">
                        View members, manage roles, and oversee workspace access.
                    </p>
                </div>


                <Button
                    variant="outline"
                    onClick={() => refetch()}
                    disabled={isFetching}
                >
                    <RefreshCw
                        className={`mr-2 h-4 w-4 ${
                            isFetching ? "animate-spin" : ""
                        }`}
                    />

                    Refresh
                </Button>

            </section>



            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4" />
                            Total Members
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {activeCount}
                        </p>
                    </CardContent>
                </Card>



                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <ShieldCheck className="h-4 w-4" />
                            Administrators
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {adminCount}
                        </p>
                    </CardContent>
                </Card>



                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <UserCheck className="h-4 w-4" />
                            Roles Assigned
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {
                                new Set(
                                    users.map(user => user.role.name)
                                ).size
                            }
                        </p>
                    </CardContent>
                </Card>

            </div>



            {/* Table */}
            <section className="space-y-4">

                <h2 className="text-xl font-semibold">
                    Members
                </h2>


                {isLoading ? (

                    <div className="flex justify-center py-12">
                        Loading users...
                    </div>

                ) : (

                    <UsersTable users={users} />

                )}

            </section>


        </div>
    );
}