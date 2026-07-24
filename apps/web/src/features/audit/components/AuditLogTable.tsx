import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Activity,
    FileText,
    Folder,
    User,
} from "lucide-react";

import type { AuditLog } from "../hooks/useAuditLogs";
import { formatDate } from "@/lib/helpers";


const actionIcon = (resourceType: string | null) => {

    switch (resourceType) {
        case "file":
            return <FileText className="h-4 w-4" />;

        case "project":
            return <Folder className="h-4 w-4" />;

        default:
            return <Activity className="h-4 w-4" />;
    }
};



const columns: ColumnDef<AuditLog>[] = [

    {
        accessorKey: "action",
        header: "Action",

        cell: ({ row }) => (
            <div className="flex items-center gap-2 font-medium">
                {actionIcon(row.original.resourceType)}

                {row.original.action}
            </div>
        ),
    },

    {
        accessorKey: "user",
        header: "User",

        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.original.user?.name ?? "-"}
            </span>
        ),
    },

    {
        accessorKey: "description",
        header: "Description",

        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.original.description ?? "-"}
            </span>
        ),
    },


    {
        accessorKey: "resourceType",
        header: "Resource",

        cell: ({ row }) => (
            <span className="capitalize text-muted-foreground">
                {row.original.resourceType ?? "-"}
            </span>
        ),
    },


    {
        accessorKey: "createdAt",
        header: "Date",

        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {formatDate(row.original.createdAt)}
            </span>
        ),
    },
];



export function AuditLogTable({
    logs,
}: {
    logs: AuditLog[];
}) {

    const table = useReactTable({
        data: logs,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    return (
        <Card>

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <Table>

                        <TableHeader>

                            {table
                                .getHeaderGroups()
                                .map(group => (
                                    <TableRow key={group.id}>

                                        {group.headers.map(header => (

                                            <TableHead key={header.id}>

                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}

                                            </TableHead>

                                        ))}

                                    </TableRow>
                                ))}

                        </TableHeader>


                        <TableBody>

                            {table.getRowModel().rows.length ? (

                                table
                                    .getRowModel()
                                    .rows
                                    .map(row => (

                                        <TableRow key={row.id}>

                                            {row
                                                .getVisibleCells()
                                                .map(cell => (

                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>

                                                ))}

                                        </TableRow>

                                    ))

                            ) : (

                                <TableRow>

                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No logs found.
                                    </TableCell>

                                </TableRow>

                            )}

                        </TableBody>

                    </Table>

                </div>

            </CardContent>

        </Card>
    );
}