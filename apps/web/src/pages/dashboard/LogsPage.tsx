import {
    Activity,
    FileText,
    Folder,
    RefreshCw,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useAuditLogs } from "@/features/audit/hooks/useAuditLogs";
import { AuditLogTable } from "@/features/audit/components/AuditLogTable";
import { Spinner } from "@/components/ui/spinner";


export default function LogsPage() {

    const {
        data: logs = [],
        isLoading,
        isFetching,
        refetch,
    } = useAuditLogs();



    const fileCount = logs.filter(
        log => log.resourceType === "file"
    ).length;


    const projectCount = logs.filter(
        log => log.resourceType === "project"
    ).length;



    return (
        <div className="container mx-auto space-y-8 px-6 py-12">


            <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Activity Logs
                    </h1>

                    <p className="text-muted-foreground">
                        Review important workspace changes and admin actions.
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



            <div className="grid gap-4 md:grid-cols-3">

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <Activity className="h-4 w-4" />
                            Total Events
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {logs.length}
                        </p>
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4" />
                            File Events
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {fileCount}
                        </p>
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <Folder className="h-4 w-4" />
                            Project Events
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {projectCount}
                        </p>
                    </CardContent>
                </Card>

            </div>



            {
                isLoading ? (
                    <div className="flex justify-center py-12">
                        <Spinner />
                    </div>
                ) : (
                    <AuditLogTable logs={logs} />
                )
            }


        </div>
    );
}