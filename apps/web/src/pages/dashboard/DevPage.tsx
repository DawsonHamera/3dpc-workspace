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


                <div className="space-y-3">

                    {devLog.map((entry) => (
                        <Card key={entry.title}>

                            <CardContent className="p-5">

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                                    <div>
                                        <h3 className="font-semibold">
                                            {entry.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {entry.description}
                                        </p>
                                    </div>


                                    <span className="text-xs whitespace-nowrap text-muted-foreground">
                                        {entry.date}
                                    </span>

                                </div>

                            </CardContent>

                        </Card>
                    ))}

                </div>

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