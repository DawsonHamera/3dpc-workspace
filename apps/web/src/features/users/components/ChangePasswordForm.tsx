import * as React from "react";

import {
    useForm,
    type UseFormSetError,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";


export type ChangePasswordData = {
    currentPassword?: string;
    newPassword: string;
    verifyPassword: string;
};


type ChangePasswordFormProps = {
    isAdmin?: boolean;

    onSubmit: (
        data: ChangePasswordData,
        setError: UseFormSetError<ChangePasswordData>
    ) => void | Promise<void>;

    loading?: boolean;
};



export function ChangePasswordForm({
    isAdmin = false,
    onSubmit,
    loading = false,
}: ChangePasswordFormProps) {


    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors,
        },
    } = useForm<ChangePasswordData>({

        defaultValues: {

            currentPassword: "",

            newPassword: "",

            verifyPassword: "",

        },

    });



    const submit = (
        data: ChangePasswordData
    ) => {


        if (
            data.newPassword !== data.verifyPassword
        ) {

            setError(
                "verifyPassword",
                {
                    message:
                        "Passwords do not match.",
                }
            );

            return;
        }


        if (
            data.newPassword.length < 8
        ) {

            setError(
                "newPassword",
                {
                    message:
                        "Password must be at least 8 characters.",
                }
            );

            return;
        }


        onSubmit(
            data,
            setError
        );
    };



    return (

        <form
            onSubmit={
                handleSubmit(submit)
            }
            noValidate
        >

            <FieldGroup>


                {
                    errors.root && (

                        <FieldDescription
                            className="text-destructive text-center"
                        >
                            {
                                errors.root.message
                            }
                        </FieldDescription>

                    )
                }




                {
                    !isAdmin && (

                        <Field>

                            <FieldLabel>
                                Current Password
                            </FieldLabel>


                            <Input
                                type="password"
                                autoComplete="current-password"
                                {...register(
                                    "currentPassword"
                                )}
                            />


                            {
                                errors.currentPassword && (

                                    <FieldDescription
                                        className="text-destructive"
                                    >
                                        {
                                            errors.currentPassword.message
                                        }
                                    </FieldDescription>

                                )
                            }

                        </Field>

                    )
                }





                <Field>

                    <FieldLabel>
                        New Password
                    </FieldLabel>


                    <Input
                        type="password"
                        autoComplete="new-password"
                        {...register(
                            "newPassword"
                        )}
                    />


                    {
                        errors.newPassword && (

                            <FieldDescription
                                className="text-destructive"
                            >
                                {
                                    errors.newPassword.message
                                }
                            </FieldDescription>

                        )
                    }


                </Field>





                <Field>

                    <FieldLabel>
                        Verify Password
                    </FieldLabel>


                    <Input
                        type="password"
                        autoComplete="new-password"
                        {...register(
                            "verifyPassword"
                        )}
                    />


                    {
                        errors.verifyPassword && (

                            <FieldDescription
                                className="text-destructive"
                            >
                                {
                                    errors.verifyPassword.message
                                }
                            </FieldDescription>

                        )
                    }


                </Field>





                <Field>

                    <Button
                        className="w-full"
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Updating..."
                                : "Update Password"
                        }

                    </Button>

                </Field>


            </FieldGroup>


        </form>

    );
}