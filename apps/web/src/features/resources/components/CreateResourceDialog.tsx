"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useCreateOnshapeResource } from "../hooks/useCreateOnshapeResource";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: "onshape" | null;
    projectSlug: string;
};

export function CreateResourceDialog({
    open,
    onOpenChange,
    type,
    projectSlug,
}: Props) {
    const [documentId, setDocumentId] = useState("");

    const createResource = useCreateOnshapeResource();

    const handleCreate = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!documentId.trim()) {
            return;
        }

        await createResource.mutateAsync({
            projectSlug,
            documentId: documentId.trim(),
        });

        setDocumentId("");
        onOpenChange(false);
    };

    if (type !== "onshape") {
        return null;
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(open) => {
                if (!open) {
                    setDocumentId("");
                }

                onOpenChange(open);
            }}
        >
            <DialogContent>
                <form onSubmit={handleCreate}>
                    <DialogHeader>
                        <DialogTitle>
                            Add Onshape Document
                        </DialogTitle>

                        <DialogDescription>
                            Add an Onshape document to this project
                            as a resource.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2 py-4">
                        <Label htmlFor="onshape-document-id">
                            Document ID
                        </Label>

                        <Input
                            id="onshape-document-id"
                            value={documentId}
                            onChange={(event) =>
                                setDocumentId(event.target.value)
                            }
                            placeholder="Enter Onshape document ID"
                            disabled={createResource.isPending}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={createResource.isPending}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={
                                !documentId.trim() ||
                                createResource.isPending
                            }
                        >
                            {createResource.isPending
                                ? "Adding..."
                                : "Add Document"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}