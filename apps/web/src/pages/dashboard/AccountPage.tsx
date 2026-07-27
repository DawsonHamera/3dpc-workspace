import { useRef, useState } from "react";
import type { UseFormSetError } from "react-hook-form";

import {
    Item,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
    ItemSeparator,
} from "@/components/ui/item";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    User,
    Mail,
    Lock,
    Bell,
    Trash2,
    Image,
    Moon,
    Sun,
} from "lucide-react";

import { useUpdateAvatar } from "@/features/users/hooks/useUpdateAvatar";
import { useUpdateUserPassword } from "@/features/users/hooks/useUpdateUserPassword";

import {
    ChangePasswordForm,
    type ChangePasswordData,
} from "@/features/users/components/ChangePasswordForm";

import { handleMutationError } from "@/lib/forms/handleMutationError";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useDeleteUser } from "@/features/users/hooks/useDeleteUser";
import { useTheme } from "@/providers/ThemeProvider";



export const AccountPage = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);


    const updateAvatar = useUpdateAvatar();

    const updatePassword = useUpdateUserPassword();

    const deleteUser = useDeleteUser();

    const { data: user } = useAuth();

    const { theme, toggleTheme } = useTheme();
    


    const handleAvatarChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = event.target.files?.[0];

        if (!file) return;


        updateAvatar.mutate(file);


        // reset input so selecting the same file again works
        event.target.value = "";

    };



    const handlePasswordUpdate = async (
        data: ChangePasswordData,
        setError: UseFormSetError<ChangePasswordData>
    ) => {

        try {

            await updatePassword.mutateAsync({

                userId: user?.id,

                currentPassword:
                    data.currentPassword,

                newPassword:
                    data.newPassword,

            });


            setPasswordDialogOpen(false);


        } catch (err) {

            handleMutationError(
                err,
                setError
            );

        }

    };

    const handleDeleteAccount = async () => {

        if (!user) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );

        if (!confirmed) return;

        try {
            await deleteUser.mutateAsync(user.id);
        } catch (err) {
            console.error("Failed to delete account:", err);
        }
    }



    return (
        <>

            <div className="flex flex-col gap-6">


                <div>

                    <h1 className="text-2xl font-bold">
                        Account Settings
                    </h1>

                    <p className="text-muted-foreground">
                        Manage your profile, security, and account preferences.
                    </p>

                </div>





                <Card>

                    <CardHeader>

                        <CardTitle>
                            Profile
                        </CardTitle>


                        <CardDescription>
                            Update your personal information.
                        </CardDescription>

                    </CardHeader>



                    <CardContent className="flex flex-col gap-3">


                        <Item>

                            <ItemMedia variant="icon">
                                <User />
                            </ItemMedia>


                            <ItemContent>

                                <ItemTitle>
                                    Display Name
                                </ItemTitle>


                                <ItemDescription>
                                    Dawson Smith
                                </ItemDescription>

                            </ItemContent>


                            <ItemActions>

                                <Button variant="outline" disabled>
                                    Edit
                                </Button>

                            </ItemActions>

                        </Item>





                        <Item>

                            <ItemMedia variant="icon">
                                <Mail />
                            </ItemMedia>


                            <ItemContent>

                                <ItemTitle>
                                    Email Address
                                </ItemTitle>


                                <ItemDescription>
                                    user@example.com
                                </ItemDescription>

                            </ItemContent>


                            <ItemActions>

                                <Button variant="outline" disabled>
                                    Change
                                </Button>

                            </ItemActions>

                        </Item>





                        <ItemSeparator />





                        <Item>

                            <ItemMedia variant="icon">
                                <Image />
                            </ItemMedia>


                            <ItemContent>

                                <ItemTitle>
                                    Profile Picture
                                </ItemTitle>


                                <ItemDescription>
                                    Upload a new avatar image.
                                </ItemDescription>

                            </ItemContent>



                            <ItemActions>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />


                                <Button
                                    variant="outline"
                                    disabled={updateAvatar.isPending}
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                >

                                    {
                                        updateAvatar.isPending
                                            ? "Uploading..."
                                            : "Upload"
                                    }

                                </Button>


                            </ItemActions>


                        </Item>


                    </CardContent>

                </Card>






                <Card>

                    <CardHeader>

                        <CardTitle>
                            Security
                        </CardTitle>


                        <CardDescription>
                            Manage your login and authentication settings.
                        </CardDescription>

                    </CardHeader>



                    <CardContent className="flex flex-col gap-3">


                        <Item>

                            <ItemMedia variant="icon">
                                <Lock />
                            </ItemMedia>


                            <ItemContent>

                                <ItemTitle>
                                    Password
                                </ItemTitle>


                                <ItemDescription>
                                    Change your account password.
                                </ItemDescription>

                            </ItemContent>



                            <ItemActions>

                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setPasswordDialogOpen(true)
                                    }
                                >
                                    Update
                                </Button>

                            </ItemActions>


                        </Item>


                    </CardContent>

                </Card>




                <Card>

                    <CardHeader>

                        <CardTitle>
                            Preferences
                        </CardTitle>

                        <CardDescription>
                            Customize your experience.
                        </CardDescription>

                    </CardHeader>

                    <CardContent className="flex flex-col gap-3">

                        <Item>

                            <ItemMedia variant="icon">
                                {theme === "dark" ? <Moon /> : <Sun />}
                            </ItemMedia>

                            <ItemContent>

                                <ItemTitle>
                                    Theme
                                </ItemTitle>

                                <ItemDescription>
                                    Currently using{" "}
                                    <span className="font-medium capitalize">
                                        {theme}
                                    </span>{" "}
                                    mode.
                                </ItemDescription>

                            </ItemContent>

                            <ItemActions>

                                <Button
                                    variant="outline"
                                    onClick={toggleTheme}
                                >
                                    Switch to{" "}
                                    {theme === "dark" ? "Light" : "Dark"} Mode
                                </Button>

                            </ItemActions>

                        </Item>

                        <Item>

                            <ItemMedia variant="icon">
                                <Bell />
                            </ItemMedia>

                            <ItemContent>

                                <ItemTitle>
                                    Notifications
                                </ItemTitle>

                                <ItemDescription>
                                    Manage email and project notifications.
                                </ItemDescription>

                            </ItemContent>

                            <ItemActions>

                                <Button
                                    variant="outline"
                                    disabled
                                >
                                    Manage
                                </Button>

                            </ItemActions>

                        </Item>

                    </CardContent>

                </Card>



                <Card>

                    <CardHeader>

                        <CardTitle className="text-destructive">
                            Danger Zone
                        </CardTitle>


                        <CardDescription>
                            Irreversible account actions.
                        </CardDescription>

                    </CardHeader>



                    <CardContent>


                        <Item>

                            <ItemMedia variant="icon">
                                <Trash2 />
                            </ItemMedia>


                            <ItemContent>

                                <ItemTitle>
                                    Delete Account
                                </ItemTitle>


                                <ItemDescription>
                                    Permanently remove your account and data.
                                </ItemDescription>

                            </ItemContent>



                            <ItemActions>

                                <Button variant="destructive" onClick={handleDeleteAccount}>
                                    Delete
                                </Button>

                            </ItemActions>


                        </Item>


                    </CardContent>


                </Card>


            </div>






            <Dialog
                open={passwordDialogOpen}
                onOpenChange={setPasswordDialogOpen}
            >

                <DialogContent>

                    <DialogHeader>

                        <DialogTitle>
                            Update Password
                        </DialogTitle>


                        <DialogDescription>
                            Enter your current password and choose a new one.
                        </DialogDescription>

                    </DialogHeader>



                    <ChangePasswordForm

                        loading={
                            updatePassword.isPending
                        }

                        onSubmit={
                            handlePasswordUpdate
                        }

                    />


                </DialogContent>

            </Dialog>


        </>
    );
};