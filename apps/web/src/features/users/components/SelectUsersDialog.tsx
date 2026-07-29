import { useEffect, useMemo, useState } from "react";
import { Check, X } from "lucide-react";

import { useSearchUsers } from "@/features/users/hooks/useSearchUsers";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFileUrl } from "@/lib/helpers";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useDebounce } from "@/hooks/useDebounce";

type SelectUsersDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    actionLabel: string;

    onAction: (userIds: string[]) => void;

    initialSelectedUserIds?: string[];
};

export function SelectUsersDialog({
    open,
    onOpenChange,
    actionLabel,
    onAction,
    initialSelectedUserIds = [],
}: SelectUsersDialogProps) {

    const [search, setSearch] = useState("");

    const [selectedUserIds, setSelectedUserIds] = useState<string[]>(
        initialSelectedUserIds
    );

    const { data: user } = useAuth()
    
    const debouncedSearch = useDebounce(search, 300);

    const {
        data: users = [],
        isLoading,
    } = useSearchUsers(debouncedSearch, 20, user?.id);



    useEffect(() => {
        if (!open) return;

        setSelectedUserIds(initialSelectedUserIds);
        setSearch("");
    }, [open]);


    const selectedUsers = useMemo(
        () =>
            users.filter((user) =>
                selectedUserIds.includes(user.id)
            ),
        [users, selectedUserIds]
    );


    const toggleUser = (userId: string) => {

        setSelectedUserIds((current) => {

            if (current.includes(userId)) {
                return current.filter(
                    (id) => id !== userId
                );
            }

            return [...current, userId];
        });
    };


    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="sm:max-w-lg">

                <DialogHeader>

                    <DialogTitle>
                        Select Users
                    </DialogTitle>

                    <DialogDescription>
                        Search and select one or more users.
                    </DialogDescription>

                </DialogHeader>


                <Command shouldFilter={false}>

                    <CommandInput
                        placeholder="Search users..."
                        value={search}
                        onValueChange={setSearch}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                        }}
                    />


                    {selectedUsers.length > 0 && (

                        <div className="flex flex-wrap gap-2 border-b p-3">

                            {selectedUsers.map((user) => (

                                <Badge
                                    key={user.id}
                                    variant="secondary"
                                    className="gap-1 pr-1"
                                >

                                    {user.name}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleUser(user.id)
                                        }
                                        className="rounded-sm hover:bg-muted"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>

                                </Badge>

                            ))}

                        </div>

                    )}


                    <CommandList className="max-h-80">

                        {isLoading && (
                            <div className="p-4 text-sm text-muted-foreground">
                                Searching...
                            </div>
                        )}

                        <CommandEmpty>
                            No users found.
                        </CommandEmpty>

                        <CommandGroup>

                            {users.map((user) => {

                                const selected =
                                    selectedUserIds.includes(
                                        user.id
                                    );

                                return (

                                    <CommandItem
                                        key={user.id}
                                        value={user.id}
                                        onSelect={() =>
                                            toggleUser(user.id)
                                        }
                                    >

                                        <Avatar className="mr-3 h-8 w-8">

                                            <AvatarImage
                                                src={(getFileUrl(user.avatarFileId)) || ""}
                                            />

                                            <AvatarFallback>
                                                {user.name
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </AvatarFallback>

                                        </Avatar>


                                        <div className="flex flex-1 flex-col">

                                            <span>
                                                {user.name}
                                            </span>

                                            <span className="text-xs text-muted-foreground">
                                                {user.email}
                                            </span>

                                        </div>


                                        <Check
                                            className={`h-4 w-4 transition-opacity ${selected
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                }`}
                                        />

                                    </CommandItem>

                                );
                            })}

                        </CommandGroup>

                    </CommandList>

                </Command>


                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={
                            selectedUserIds.length === 0
                        }
                        onClick={() => {
                            onAction(selectedUserIds);
                            onOpenChange(false);
                        }}
                    >
                        {actionLabel}
                        {" "}
                        ({selectedUserIds.length})
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}