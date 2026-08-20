import { useRef, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useCreateFileResource } from "../hooks/useCreateFileResource";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectSlug: string;
};

export function CreateFileResourceDialog({
    open,
    onOpenChange,
    projectSlug,
}: Props) {
    const [file, setFile] = useState<File | null>(null);

    const inputRef =
        useRef<HTMLInputElement>(null);

    const createResource =
        useCreateFileResource();

    const handleCreate = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!file) {
            return;
        }

        await createResource.mutateAsync({
            projectSlug,
            file,
        });

        setFile(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }

        onOpenChange(false);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setFile(null);

            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }

        onOpenChange(open);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}
        >
            <DialogContent>
                <form onSubmit={handleCreate}>
                    <DialogHeader>
                        <DialogTitle>
                            Add File
                        </DialogTitle>

                        <DialogDescription>
                            Upload a file to add to this
                            project.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2 py-4">
                        <Label htmlFor="resource-file">
                            File
                        </Label>

                        <input
                            ref={inputRef}
                            id="resource-file"
                            type="file"
                            onChange={(event) =>
                                setFile(
                                    event.target.files?.[0] ??
                                        null
                                )
                            }
                            disabled={
                                createResource.isPending
                            }
                            className="
                                flex w-full
                                cursor-pointer
                                rounded-md border
                                bg-background
                                px-3 py-2
                                text-sm
                                file:mr-3
                                file:rounded-md
                                file:border-0
                                file:bg-muted
                                file:px-3
                                file:py-1
                                file:text-sm
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        />

                        {file && (
                            <p className="text-sm text-muted-foreground">
                                Selected:{" "}
                                <span className="font-medium text-foreground">
                                    {file.name}
                                </span>
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                onOpenChange(false)
                            }
                            disabled={
                                createResource.isPending
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={
                                !file ||
                                createResource.isPending
                            }
                        >
                            {createResource.isPending
                                ? "Uploading..."
                                : "Add File"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}