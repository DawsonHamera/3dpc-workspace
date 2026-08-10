import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table";

import {
    MoreHorizontal,
    Shield,
    Trash2,
    KeyRound,
} from "lucide-react";

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
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

import type { Users } from "../hooks/useGetUsers";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useUpdateUserRole } from "../hooks/useUpdateUserRole";
import { useUpdateUserPassword } from "../hooks/useUpdateUserPassword";
import { ChangePasswordForm, type ChangePasswordData } from "./ChangePasswordForm";
import type { UseFormSetError } from "react-hook-form";
import { handleMutationError } from "@/lib/forms/handleMutationError";


const roles = [
    "guest",
    "member",
    "admin",
    "owner",
];



function UserActions({
    user,
}: {
    user: Users[number]
}) {

    const [roleDialogOpen, setRoleDialogOpen] = useState(false);
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

    const [selectedRole, setSelectedRole] = useState(
        user.role.name
    );


    const deleteUser = useDeleteUser();
    const updateRole = useUpdateUserRole();
    const updatePassword = useUpdateUserPassword();

    const handlePasswordUpdate = async (
        data: ChangePasswordData,
        setError: UseFormSetError<ChangePasswordData>
    ) => {

        try {

            await updatePassword.mutateAsync({
                userId: user.id,
                currentPassword: data?.currentPassword,
                newPassword: data.newPassword,
            });


            setPasswordDialogOpen(false);


        } catch (err) {

            handleMutationError(
                err,
                setError
            );

        }
    };


    return (
        <>

            <DropdownMenu>

                <DropdownMenuTrigger
                    render={
                        <Button
                            variant="ghost"
                            size="icon"
                        >
                            <MoreHorizontal />
                        </Button>
                    }
                />


                <DropdownMenuContent align="end">


                    <DropdownMenuItem
                        onClick={() => {
                            setSelectedRole(user.role.name);
                            setRoleDialogOpen(true);
                        }}
                    >
                        <Shield className="mr-2 h-4 w-4" />

                        Change Role
                    </DropdownMenuItem>


                    <DropdownMenuItem
                        onClick={() =>
                            setPasswordDialogOpen(true)
                        }
                    >
                        <KeyRound className="mr-2 h-4 w-4" />

                        Change Password
                    </DropdownMenuItem>


                    <DropdownMenuItem
                        className="text-destructive"
                        onClick={() =>
                            deleteUser.mutate(user.id)
                        }
                    >
                        <Trash2 className="mr-2 h-4 w-4" />

                        Delete User
                    </DropdownMenuItem>


                </DropdownMenuContent>

            </DropdownMenu>




            {/* Role Dialog */}

            <Dialog
                open={roleDialogOpen}
                onOpenChange={setRoleDialogOpen}
            >

                <DialogContent>

                    <DialogHeader>

                        <DialogTitle>
                            Change Role
                        </DialogTitle>

                        <DialogDescription>
                            Update permissions for {user.name}.
                        </DialogDescription>

                    </DialogHeader>


                    <Select
                        value={selectedRole}
                        onValueChange={(value) => setSelectedRole(value || "guest")}
                    >

                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>


                        <SelectContent>

                            {
                                roles.map(role => (
                                    <SelectItem
                                        key={role}
                                        value={role}
                                    >
                                        {role}
                                    </SelectItem>
                                ))
                            }

                        </SelectContent>

                    </Select>


                    <DialogFooter>

                        <Button
                            variant="outline"
                            onClick={() =>
                                setRoleDialogOpen(false)
                            }
                        >
                            Cancel
                        </Button>


                        <Button
                            disabled={
                                selectedRole === user.role.name ||
                                updateRole.isPending
                            }
                            onClick={() => {

                                updateRole.mutate({
                                    userId: user.id,
                                    roleName: selectedRole,
                                });

                                setRoleDialogOpen(false);

                            }}
                        >
                            Save
                        </Button>

                    </DialogFooter>


                </DialogContent>

            </Dialog>





            {/* Password Dialog */}

            <Dialog
                open={passwordDialogOpen}
                onOpenChange={setPasswordDialogOpen}
            >

                <DialogContent>

                    <DialogHeader>

                        <DialogTitle>
                            Change Password
                        </DialogTitle>

                        <DialogDescription>
                            Update password for {user.name}.
                        </DialogDescription>

                    </DialogHeader>


                    <ChangePasswordForm
                        loading={updatePassword.isPending}
                        onSubmit={handlePasswordUpdate}
                        isAdmin={true}
                    />


                </DialogContent>

            </Dialog>
        </>
    );
}




const columns: ColumnDef<Users[number]>[] = [

    {
        accessorKey: "name",
        header: "User",

        cell: ({ row }) => {

            const user = row.original;

            return (
                <div className="flex items-center gap-3">

                    <Avatar>

                        {
                            user.avatarId &&
                            (
                                <AvatarImage
                                    src={`/files/${user.avatarId}/download`}
                                />
                            )
                        }

                        <AvatarFallback>

                            {
                                user.name
                                    .split(" ")
                                    .map((x) => x[0])
                                    .join("")
                                    .slice(0, 2)
                            }

                        </AvatarFallback>

                    </Avatar>


                    <div>

                        <p className="font-medium">
                            {user.name}
                        </p>


                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>

                    </div>


                </div>
            );
        },
    },


    {
        header: "Role",

        cell: ({ row }) => (

            <Badge variant="secondary">
                {row.original.role.name}
            </Badge>

        ),
    },


    {
        header: "Description",

        cell: ({ row }) => (

            <span className="text-muted-foreground">
                {
                    row.original.role.description ??
                    "No description"
                }
            </span>

        ),
    },


    {
        id: "actions",

        cell: ({ row }) => (

            <UserActions
                user={row.original}
            />

        ),
    },

];





export function UsersTable({
    users,
}: {
    users: Users;
}) {


    const table = useReactTable({

        data: users,

        columns,

        getCoreRowModel:
            getCoreRowModel(),

    });



    return (

        <Card>

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <Table>


                        <TableHeader>

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
                                                                :
                                                                flexRender(
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
                            }

                        </TableBody>


                    </Table>

                </div>

            </CardContent>

        </Card>

    );
}