"use client"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table"

import { formatDate, formatBytes } from "@/lib/helpers"
import { Box, File, FileText, Image, MoreHorizontal, PlusCircle } from "lucide-react"
import { Table, TableRow, TableHead, TableBody, TableCell, TableHeader, TableFooter } from "../../../components/ui/table"
import { useNavigate } from "react-router-dom"
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "../../../components/ui/item"
import { Button } from "../../../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import { registry } from "@/pages/dashboard/FilePage"
import { useDeleteFile } from "@/features/files/hooks/useDeleteFile"


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


const FileActions = ({
    file,
}: {
    file: ProjectFile,
}) => {
    const deleteFile = useDeleteFile();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreHorizontal />
                    </Button>
                }
            />

            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();

                        deleteFile.mutate({
                            id: file.id,
                        });
                    }}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
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
    {
        id: "actions",
        cell: ({ row }) => (
            <FileActions file={row.original} />
        )
    }
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

    const navigate = useNavigate()


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
                                        <TableRow
                                            key={row.id}
                                            onClick={() => navigate(`files/${row.original.id}/edit`)}
                                            className="cursor-pointer hover:bg-muted"
                                        >
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
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={columns.length}>
                            <Item className="w-full">
                                <ItemMedia variant="icon">
                                    <PlusCircle />
                                </ItemMedia>

                                <ItemContent>
                                    <ItemTitle>
                                        Add New File
                                    </ItemTitle>
                                </ItemContent>

                                <ItemActions>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger render={<Button variant="outline" />}>
                                            Create
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuGroup>
                                                <DropdownMenuLabel>File Types</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => navigate(`files/${registry.document.template}/edit`)}>
                                                    Document
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => navigate('/create/spreadsheet-template')}>
                                                    Spreadsheet
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>


                                    <Button variant="outline">
                                        Upload
                                    </Button>
                                </ItemActions>
                            </Item>
                        </TableCell>
                    </TableRow>
                </TableFooter>

            </Table>
        </div>
    )
}