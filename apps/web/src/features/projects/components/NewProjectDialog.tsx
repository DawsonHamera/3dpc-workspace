import { useEffect, useRef } from "react";
import { useForm, type UseFormSetError } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import { handleMutationError } from "@/lib/forms/handleMutationError";
import { useCreateProject, type CreateProjectData } from "../useCreateProjectBySlug";
import { useNavigate } from "react-router-dom";


interface CreateProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export function CreateProjectDialog({
    open,
    onOpenChange,
}: CreateProjectDialogProps) {
    const mutation = useCreateProject();

    const navigate = useNavigate();

    const slugEdited = useRef(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        reset,
        formState: { errors },
    } = useForm<CreateProjectData>({
        defaultValues: {
            name: "",
            slug: "",
            shortDescription: "",
            description: "",
            visibility: "private",
            isFeatured: false,
        },
    });

    const name = watch("name");

    useEffect(() => {
        if (!slugEdited.current) {
            setValue("slug", slugify(name ?? ""));
        }
    }, [name, setValue]);

    useEffect(() => {
        if (!open) {
            slugEdited.current = false;
            reset();
        }
    }, [open, reset]);

    const submit = async (data: CreateProjectData) => {
        try {
            const project = await mutation.mutateAsync(data);

            reset();
            slugEdited.current = false;
            onOpenChange(false);
            navigate(`/dashboard/projects/${project.slug}`);

        } catch (err) {
            handleMutationError(err, setError);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        Create Project
                    </DialogTitle>

                    <DialogDescription>
                        Create a new workspace for files,
                        members, and resources.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(submit)}
                    className="mt-4"
                >
                    <FieldGroup>

                        {errors.root && (
                            <FieldDescription className="text-destructive">
                                {errors.root.message}
                            </FieldDescription>
                        )}

                        <Field>
                            <FieldLabel>
                                Project Name
                            </FieldLabel>

                            <Input
                                {...register("name")}
                                placeholder="My Awesome Project"
                            />

                            {errors.name && (
                                <FieldDescription className="text-destructive">
                                    {errors.name.message}
                                </FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel>
                                Slug
                            </FieldLabel>

                            <Input
                                {...register("slug")}
                                onChange={(e) => {
                                    slugEdited.current = true;
                                    register("slug").onChange(e);
                                }}
                            />

                            <FieldDescription>
                                /projects/{watch("slug")}
                            </FieldDescription>
                        </Field>

                        <Field>
                            <FieldLabel>
                                Short Description
                            </FieldLabel>

                            <Input
                                {...register("shortDescription")}
                                placeholder="One sentence summary..."
                            />
                        </Field>

                        <Field>
                            <FieldLabel>
                                Description
                            </FieldLabel>

                            <Textarea
                                rows={5}
                                {...register("description")}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>
                                Visibility
                            </FieldLabel>

                            <RadioGroup
                                value={watch("visibility")}
                                onValueChange={(value) =>
                                    setValue(
                                        "visibility",
                                        value as "public" | "private"
                                    )
                                }
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="private" />
                                    <span>Private</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="public" />
                                    <span>Public</span>
                                </div>
                            </RadioGroup>
                        </Field>

                        <Field className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div>
                                <FieldLabel>
                                    Featured Project
                                </FieldLabel>

                                <FieldDescription>
                                    Display on the public homepage.
                                </FieldDescription>
                            </div>

                            <Switch
                                checked={watch("isFeatured")}
                                onCheckedChange={(checked) =>
                                    setValue("isFeatured", checked)
                                }
                            />
                        </Field>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending
                                    ? "Creating..."
                                    : "Create Project"}
                            </Button>
                        </div>

                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}