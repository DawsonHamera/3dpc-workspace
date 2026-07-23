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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/helpers";


export type ProjectMember = {
    id: string;
    role: string;
    joinedAt: string;
    user: {
        name: string;
        email: string;
        avatarFileId?: string;
    };
};

const convertAvatarIdToUrl = (avatarId: string | undefined) => {

    const API_URL = import.meta.env.VITE_API_URL ?? "";

    return avatarId
        ? `${API_URL}/files/${avatarId}/download`
        : "/default-avatar.png";``

}


const columns: ColumnDef<ProjectMember>[] = [
    {
        accessorKey: "name",
        header: "Member",
        cell: ({ row }) => {
            const member = row.original;

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={convertAvatarIdToUrl(member.user.avatarFileId)} />
                        <AvatarFallback>
                            {member.user.name
                                .split(" ")
                                .map(x => x[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <span className="font-medium">
                            {member.user.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {member.user.email}
                        </span>
                    </div>
                </div>
            );
        },
    },

    {
        accessorKey: "role",
        header: "Role",
    },

    {
        accessorKey: "joinedAt",
        header: "Joined",
        cell: ({ row }) => (
            formatDate(row.original.joinedAt)
        ),
    },
];


export function ProjectMembersTable({
    members,
}: {
    members: ProjectMember[];
}) {

    const table = useReactTable({
        data: members,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>

                <TableHeader className="bg-muted">
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
                                No members found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </div>
    );
}