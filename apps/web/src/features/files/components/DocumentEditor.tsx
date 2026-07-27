import TextEditor from "@/components/custom/TextEditor";

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";

import {
    CheckCircle,
    Triangle,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import {
    useBlocker,
    useNavigate,
} from "react-router-dom";

import {
    Spinner,
} from "@/components/ui/spinner";

import {
    isApiError,
} from "@/features/apiFetch";

import {
    useUpdateFile,
} from "@/features/files/hooks/useUpdateFile";


import type {
    FileComponentProps,
} from "../../../pages/dashboard/FilePage";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useProjectFileUpload } from "@/features/projects/useProjectFileUpload";

export const DocumentEditor = ({
    fileRecord,
    projectSlug,
    fileContent,
}: FileComponentProps) => {

    const navigate = useNavigate();





    const [content, setContent] = useState(fileContent);

    const [filename, setFilename] =
        useState<string>(
            fileRecord.originalName?.replace(".pdoc", "") ??
            "Untitled Document"
        );

    const [dialogOpen, setDialogOpen] = useState(false);
    const [showLeaveDialog, setShowLeaveDialog] = useState(false);


    const [saveState, setSaveState] = useState<
        "saved" | "dirty" | "saving" | "error"
    >("saved");



    const isDirty = saveState === "dirty";

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            !fileRecord.isTemplate &&
            isDirty &&
            currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        if (blocker.state === "blocked") {
            setShowLeaveDialog(true);
        }
    }, [blocker.state]);

    const [savedAt, setSavedAt] =
        useState<Date | null>(
            fileRecord.updatedAt
                ? new Date(fileRecord.updatedAt)
                : null
        );


    const [error, setError] = useState<string | null>(null);


    const updateFile = useUpdateFile();

    const uploadFile = useProjectFileUpload();

    const isSaving =
        updateFile.isPending;

    useEffect(() => {
        if (
            fileRecord.isTemplate ||
            saveState !== "dirty" ||
            showLeaveDialog ||
            blocker.state === "blocked"
        ) {
            return;
        }

        const timeout = setTimeout(() => {
            handleSave();
        }, 2000);

        return () => clearTimeout(timeout);

    }, [
        content,
        saveState,
        showLeaveDialog,
        blocker.state,
    ]);


    const handleSave = async () => {

        setError(null);



        const file = new File(
            [
                JSON.stringify(content),
            ],
            `${filename}.pdoc`,
            {
                type: "application/json",
            }
        );


        try {
            if (fileRecord.isTemplate) {
                const { id } = await uploadFile.mutateAsync({
                    projectSlug,
                    file,
                });

                setDialogOpen(false);
                navigate(`/dashboard/projects/${projectSlug}/files/${id}/edit`);
            }

            await updateFile.mutateAsync({
                id: fileRecord.id,
                file,
            });

            setSavedAt(new Date());
            setSaveState("saved");

        } catch (err) {

            if (isApiError(err)) {

                setError(
                    err.error.message
                );

            } else {

                setError(
                    "Failed to save document."
                );

            }
        }
    };


    return (
        <div className="flex flex-col gap-4">
            <div
                className="
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    border
                    bg-muted/30
                    px-4
                    py-3
                "
            >

                <div className="flex items-center gap-5">
                    <h2 className="text-lg font-semibold">
                        {filename}
                    </h2>

                    <div className="flex items-center text-sm text-muted-foreground">
                        {saveState === "dirty" && (
                            <>
                                <Triangle className="mr-1 h-4 w-4" />
                                Unsaved changes
                            </>
                        )}

                        {saveState === "saving" && (
                            <>
                                <Spinner className="mr-1 h-4 w-4" />
                                Saving...
                            </>
                        )}

                        {saveState === "saved" && (
                            <>
                                <CheckCircle className="mr-1 h-4 w-4" />
                                {savedAt
                                    ? `Saved ${savedAt.toLocaleString()}`
                                    : "Saved"}
                            </>
                        )}

                        {saveState === "error" && (
                            <>
                                <Triangle className="mr-1 h-4 w-4 text-destructive" />
                                Failed to save
                            </>
                        )}
                    </div>
                </div>


                <Button
                    disabled={isSaving}
                    onClick={() => fileRecord.isTemplate ? setDialogOpen(true) : handleSave()}
                >

                    {
                        isSaving &&
                        (
                            <Spinner
                                className="
                                    mr-2
                                    h-4
                                    w-4
                                "
                            />
                        )
                    }
                    {fileRecord.isTemplate ? "Save as New Document" : "Save Document"}
                </Button>



            </div>

            {
                error &&
                (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )
            }

            <TextEditor
                key={fileRecord.id + fileRecord.updatedAt}
                content={content}
                onChange={(value) => {

                    setContent(value);
                    setSaveState("dirty");

                }}
            />

            <Dialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            >
                <DialogContent>

                    <DialogHeader>
                        <DialogTitle>
                            Create New Document
                        </DialogTitle>
                    </DialogHeader>

                    <Input
                        value={filename}
                        onChange={(e) =>
                            setFilename(e.target.value)
                        }
                        placeholder="Filename"
                    />

                    {
                        error &&
                        (
                            <p
                                className="
                        text-sm
                        text-destructive
                    "
                            >
                                {error}
                            </p>
                        )
                    }

                    <DialogFooter>

                        <Button
                            disabled={isSaving}
                            onClick={handleSave}
                        >

                            {isSaving && <Spinner className="mr-2 h-4 w-4" />}

                            Create Document

                        </Button>

                    </DialogFooter>

                </DialogContent>
            </Dialog>
            <Dialog
                open={showLeaveDialog}
                onOpenChange={(open) => {
                    if (!open) {
                        if (blocker.state === "blocked") {
                            blocker.reset();
                        }
                    }
                    setShowLeaveDialog(open);
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Unsaved changes
                        </DialogTitle>

                        <DialogDescription>
                            You have unsaved changes. Leave without saving?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button
                            disabled={isSaving}
                            onClick={async () => {
                                await handleSave();
                                if (blocker.state === "blocked") {
                                    blocker.proceed();
                                }
                            }}
                        >
                            {isSaving && <Spinner className="mr-2 h-4 w-4" />}
                            Save
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (blocker.state === "blocked") {
                                    blocker.proceed();
                                }
                            }}
                        >
                            Leave
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </div>
    );
};