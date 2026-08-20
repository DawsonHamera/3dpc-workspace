import {
    CheckCircle2,
    CircleAlert,
    Clock3,
    Printer,
    Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type PrinterStatus = "active" | "maintenance" | "inactive";

type PrinterInfo = {
    id: string;
    name: string;
    model: string;
    status: PrinterStatus;
    description: string;
    image?: string;
};

const printers: PrinterInfo[] = [
    {
        id: "ender-3-modded",
        name: "Ender-3",
        model: "Modded",
        status: "active",
        description: "Modified Ender-3 configured for general-purpose printing.",
        image: "/images/printers/ender-3.png",
    },
    {
        id: "ender-3-2",
        name: "Ender-3",
        model: "Printer 2",
        status: "active",
        description: "General-purpose FDM printer.",
        image: "/images/printers/ender-3.png",
    },
    {
        id: "cr-10",
        name: "CR-10",
        model: "CR-10",
        status: "inactive",
        description: "Currently offline and unavailable for jobs.",
        image: "/images/printers/cr-10.png",
    },
    {
        id: "ender-3-v3-se",
        name: "Ender-3 V3 SE",
        model: "V3 SE",
        status: "maintenance",
        description: "Temporarily unavailable while undergoing maintenance.",
        image: "/images/printers/ender-3-v3-se.png",
    },
    {
        id: "ultimaker-s5-1",
        name: "Ultimaker S5",
        model: "Printer 1",
        status: "active",
        description: "Large-format professional FDM printer.",
        image: "/images/printers/ultimaker-s5.webp",
    },
    {
        id: "ultimaker-s5-2",
        name: "Ultimaker S5",
        model: "Printer 2",
        status: "active",
        description: "Large-format professional FDM printer.",
        image: "/images/printers/ultimaker-s5.webp",
    },
    {
        id: "resin-printer",
        name: "Resin Printer",
        model: "Phrozen Sonic Mighty 12K",
        status: "inactive",
        description: "Currently inactive while the resin workflow is being established.",
        image: "/images/printers/resin-printer.webp",
    },
];

const statusConfig: Record<
    PrinterStatus,
    {
        label: string;
        icon: typeof CheckCircle2;
        className: string;
    }
> = {
    active: {
        label: "Active",
        icon: CheckCircle2,
        className:
            "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    maintenance: {
        label: "Maintenance",
        icon: Wrench,
        className:
            "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    inactive: {
        label: "Inactive",
        icon: Clock3,
        className:
            "border-muted-foreground/20 bg-muted text-muted-foreground",
    },
};

function PrinterStatusBadge({ status }: { status: PrinterStatus }) {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <Badge
            variant="outline"
            className={`gap-1.5 ${config.className}`}
        >
            <Icon className="size-3.5" />
            {config.label}
        </Badge>
    );
}

function PrinterImage({
    printer,
}: {
    printer: PrinterInfo;
}) {
    return (
        <div className="relative h-64 overflow-hidden border-b bg-muted/30 sm:h-72">
            {printer.image ? (
                <img
                    src={printer.image}
                    alt={`${printer.name} ${printer.model}`}
                    className="size-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                />
            ) : (
                <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Printer className="size-12 opacity-40" />
                    <span className="text-xs">Printer image</span>
                </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/50 to-transparent" />
        </div>
    );
}

function PrinterCard({ printer }: { printer: PrinterInfo }) {
    return (
        <Card className="group overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md">
            <CardContent className="p-0">
                <PrinterImage printer={printer} />
            </CardContent>

            <CardHeader className="gap-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <CardTitle className="text-lg">
                            {printer.name}
                        </CardTitle>

                        <CardDescription className="mt-0.5">
                            {printer.model}
                        </CardDescription>
                    </div>

                    <PrinterStatusBadge status={printer.status} />
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                    {printer.description}
                </p>
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                    <span>Printer management</span>
                    <span className="font-medium">
                        Coming soon
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

export default function PrintersPage() {
    const activeCount = printers.filter(
        (printer) => printer.status === "active",
    ).length;

    const maintenanceCount = printers.filter(
        (printer) => printer.status === "maintenance",
    ).length;

    const inactiveCount = printers.filter(
        (printer) => printer.status === "inactive",
    ).length;

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="space-y-8">
                {/* Header */}
                <section className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Printer className="size-5" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Active Printers
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                View the current 3D printer fleet and availability.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Fleet summary */}
                <section className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                                <CheckCircle2 className="size-5" />
                            </div>

                            <div>
                                <p className="text-2xl font-semibold">
                                    {activeCount}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Active printers
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                                <Wrench className="size-5" />
                            </div>

                            <div>
                                <p className="text-2xl font-semibold">
                                    {maintenanceCount}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    In maintenance
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                <CircleAlert className="size-5" />
                            </div>

                            <div>
                                <p className="text-2xl font-semibold">
                                    {inactiveCount}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Inactive
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Future functionality notice */}
                <Card className="border-primary/20 bg-primary/[0.03]">
                    <CardContent className="flex gap-4 p-5">
                        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Printer className="size-4" />
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium">
                                Printer management is coming soon
                            </p>

                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Future updates will connect printers to the workspace,
                                provide live availability and status information, and
                                enable automated slicing and job management.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Printer grid */}
                <section className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Printer Fleet
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            {printers.length} printers configured in the workspace.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {printers.map((printer) => (
                            <PrinterCard
                                key={printer.id}
                                printer={printer}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}