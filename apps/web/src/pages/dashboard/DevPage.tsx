import {
    CheckCircle2,
    Clock,
    Hammer,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { devFeatures, devLog } from "@/features/dev/data";
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from "@/components/ui/table";


const statusIcon = {
    complete: <CheckCircle2 className="h-4 w-4" />,
    "in-progress": <Hammer className="h-4 w-4" />,
    planned: <Clock className="h-4 w-4" />,
};


const statusVariant = {
    complete: "default",
    "in-progress": "secondary",
    planned: "outline",
} as const;


export default function DevPage() {
    return (
        <div className="container mx-auto space-y-10 px-6 py-12">

            {/* Header */}
            <section>
                <h1 className="text-4xl font-bold tracking-tight">
                    Development Progress
                </h1>

                <p className="mt-2 text-muted-foreground">
                    A timeline of features, improvements, and upcoming work.
                </p>
            </section>


            {/* Recent Updates */}
            <section className="space-y-4">

                <div>
                    <h2 className="text-2xl font-bold">
                        Recent Updates
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Smaller improvements, fixes, and ongoing changes.
                    </p>
                </div>


                <Card>
                    <CardContent className="p-0">

                        <div className="overflow-x-auto">

                            <Table className="table-fixed">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[25%]">
                                            Update
                                        </TableHead>

                                        <TableHead className="w-[55%]">
                                            Description
                                        </TableHead>

                                        <TableHead className="w-[20%] text-right">
                                            Date
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {devLog
                                        .sort(
                                            (a, b) =>
                                                new Date(b.date).getTime() -
                                                new Date(a.date).getTime()
                                        )
                                        .map((entry) => (
                                            <TableRow key={entry.title}>
                                                <TableCell className="font-medium align-top">
                                                    {entry.title}
                                                </TableCell>

                                                <TableCell className="whitespace-normal break-words align-top text-muted-foreground">
                                                    {entry.description}
                                                </TableCell>

                                                <TableCell className="whitespace-nowrap text-right align-top text-muted-foreground">
                                                    {entry.date}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>

                        </div>

                    </CardContent>
                </Card>

            </section>


            {/* Major Features */}
            <section className="space-y-4">

                <div>
                    <h2 className="text-2xl font-bold">
                        Major Features
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Larger systems and milestones completed during development.
                    </p>
                </div>


                <div className="space-y-4">

                    {devFeatures.map((feature) => (
                        <Card key={feature.title}>

                            <CardHeader>

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                                    <CardTitle className="text-xl">
                                        {feature.title}
                                    </CardTitle>


                                    <Badge
                                        variant={statusVariant[feature.status]}
                                        className="w-fit p-3"
                                    >
                                        <span className="mr-1">
                                            {statusIcon[feature.status]}
                                        </span>

                                        {feature.status}
                                    </Badge>

                                </div>

                            </CardHeader>


                            <CardContent className="space-y-2">

                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>


                                <p className="text-sm text-muted-foreground">
                                    {feature.date}
                                </p>

                            </CardContent>

                        </Card>
                    ))}

                </div>

            </section>

        </div>
    );
}