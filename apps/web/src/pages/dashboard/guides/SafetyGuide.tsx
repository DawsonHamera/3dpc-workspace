import {
    ShieldCheck,
    Flame,
    Eye,
    Users,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


export default function SafetyGuide() {

    return (
        <div className="container mx-auto max-w-5xl px-6 py-10">

            <div>
                <h1 className="text-4xl font-bold">
                    3D Printing Safety
                </h1>

                <p className="mt-3 text-lg text-muted-foreground">
                    Our machines are powerful tools. Following a few
                    simple rules keeps everyone safe.
                </p>
            </div>


            <div className="mt-8 grid gap-6 md:grid-cols-2">


                <Card>
                    <CardHeader>
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        <CardTitle>
                            General Safety
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li>Ask before using unfamiliar equipment</li>
                            <li>Keep workspace organized</li>
                            <li>Report damaged equipment</li>
                        </ul>
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader>
                        <Flame className="h-8 w-8 text-primary" />
                        <CardTitle>
                            Heat & Machines
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li>Nozzle temperatures can exceed 200°C</li>
                            <li>Do not touch moving parts while printing</li>
                            <li>Never leave unsafe prints unattended</li>
                        </ul>
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader>
                        <Eye className="h-8 w-8 text-primary" />
                        <CardTitle>
                            Materials & Ventilation
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li>
                                Some printing materials can release fumes or particles during heating.
                            </li>

                            <li>
                                Use proper ventilation when working with materials such as ABS, ASA,
                                polycarbonate, nylon, or resin.
                            </li>

                            <li>
                                Avoid printing unknown materials or recycled plastics without approval.
                            </li>

                            <li>
                                Resin printing requires gloves, eye protection, and careful handling
                                of uncured resin.
                            </li>

                            <li>
                                Ask a supervisor before using unfamiliar materials or equipment.
                            </li>
                        </ul>
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader>
                        <Users className="h-8 w-8 text-primary" />
                        <CardTitle>
                            Club Responsibility
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-sm">
                            Everyone in the club is responsible for
                            creating a safe and welcoming workspace.
                        </p>
                    </CardContent>
                </Card>


            </div>

        </div>
    );
}