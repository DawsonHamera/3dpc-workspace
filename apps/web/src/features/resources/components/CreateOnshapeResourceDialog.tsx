import { useState } from "react";

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

import { useCreateOnshapeResource } from "../hooks/useCreateOnshapeResource";
import { useOnshapeDocuments } from "@/features/onshape/useOnshapeDocuments";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectSlug: string;
};

export function CreateOnshapeResourceDialog({
    open,
    onOpenChange,
    projectSlug,
}: Props) {
    const [documentId, setDocumentId] = useState("");

    const createResource =
        useCreateOnshapeResource();

    const {
        data: documents,
        isLoading: documentsLoading,
        isError: documentsError,
    } = useOnshapeDocuments();

    const handleCreate = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!documentId) {
            return;
        }

        await createResource.mutateAsync({
            projectSlug,
            documentId,
        });

        setDocumentId("");
        onOpenChange(false);
    };

    const hasDocuments =
        documents && documents.length > 0;

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
                            Select an Onshape document to add
                            to this project.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2 py-4">
                        <Label htmlFor="onshape-document">
                            Document
                        </Label>

                        {documentsLoading ? (
                            <div className="flex h-10 items-center rounded-md border px-3 text-sm text-muted-foreground">
                                Loading documents...
                            </div>
                        ) : documentsError ? (
                            <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                                Failed to load Onshape documents.
                            </div>
                        ) : !hasDocuments ? (
                            <div className="rounded-md border px-3 py-2 text-sm text-muted-foreground">
                                No Onshape documents found.
                            </div>
                        ) : (
                            <select
                                id="onshape-document"
                                value={documentId}
                                onChange={(event) =>
                                    setDocumentId(
                                        event.target.value
                                    )
                                }
                                disabled={
                                    createResource.isPending
                                }
                                className="
                                    flex h-10 w-full
                                    rounded-md border
                                    bg-background
                                    px-3 py-2
                                    text-sm
                                    outline-none
                                    focus:ring-2
                                    focus:ring-ring
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                <option value="">
                                    Select a document...
                                </option>

                                {documents.map((document) => (
                                    <option
                                        key={document.id}
                                        value={document.id}
                                    >
                                        {document.name}
                                    </option>
                                ))}
                            </select>
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
                                !documentId ||
                                documentsLoading ||
                                documentsError ||
                                !hasDocuments ||
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