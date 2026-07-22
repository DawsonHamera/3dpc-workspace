"use client"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table"

import { formatDate, formatBytes } from "@/lib/helpers"
import { Box, File, FileText, Image } from "lucide-react"
import {Table, TableRow, TableHead, TableBody, TableCell, TableCaption, TableHeader } from "./ui/table"


const typeToIconMap: Record<string, React.ReactNode> = {
    "image": <Image className="h-4 w-4" />,
    "stl": <Box className="h-4 w-4" />,
    "document": <FileText className="h-4 w-4" />,
    "other": <File className="h-4 w-4" />,
};

export type ProjectFile = {
    id: string
    originalName: string
    type: string
    size: number
    createdAt: string
}


const columns: ColumnDef<ProjectFile>[] = [
    {
        accessorKey: "originalName",
        header: "Name",
        cell: ({ row }) => (
            <div
                className="max-w-[300px] truncate font-medium"
                title={row.original.originalName}
            >
                {row.original.originalName}
            </div>
        ),
    },

    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                {typeToIconMap[row.original.type] || typeToIconMap["other"]}
                {row.original.type}
            </div>
        ),
    },

    {
        accessorKey: "createdAt",
        header: "Uploaded",
        cell: ({ row }) => (
            formatDate(row.original.createdAt)
        ),
    },

    {
        accessorKey: "size",
        header: () => (
            <div className="text-right">
                Size
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-right">
                {formatBytes(row.original.size)}
            </div>
        ),
    },
]


export function ProjectFilesTable({
    files,
}: {
    files: ProjectFile[]
}) {

    const table = useReactTable({
        data: files,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })


    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>

                <TableHeader className="bg-muted">
                    {
                        table
                            .getHeaderGroups()
                            .map(group => (
                                <TableRow key={group.id}>
                                    {
                                        group.headers.map(header => (
                                            <TableHead key={header.id}>
                                                {
                                                    header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                }
                                            </TableHead>
                                        ))
                                    }
                                </TableRow>
                            ))
                    }
                </TableHeader>


                <TableBody>

                    {
                        table.getRowModel().rows.length
                            ? (
                                table
                                    .getRowModel()
                                    .rows
                                    .map(row => (
                                        <TableRow key={row.id}>
                                            {
                                                row
                                                    .getVisibleCells()
                                                    .map(cell => (
                                                        <TableCell key={cell.id}>
                                                            {
                                                                flexRender(
                                                                    cell.column.columnDef.cell,
                                                                    cell.getContext()
                                                                )
                                                            }
                                                        </TableCell>
                                                    ))
                                            }
                                        </TableRow>
                                    ))
                            )
                            : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No files found.
                                    </TableCell>
                                </TableRow>
                            )
                    }

                </TableBody>

            </Table>
        </div>
    )
}