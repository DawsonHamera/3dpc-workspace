import { useRef } from "react";
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
    User,
    Mail,
    Lock,
    Bell,
    Trash2,
    Image,
} from "lucide-react";
import { useUpdateAvatar } from "@/features/users/hooks/useUpdateAvatar";

const AccountPanel = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateAvatar = useUpdateAvatar();

    const handleAvatarChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        updateAvatar.mutate(file);

        // reset input so selecting the same file again works
        event.target.value = "";
    };


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
                                <Button variant="outline">
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
                                <Button variant="outline">
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
                                    {updateAvatar.isPending
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
                                <Button variant="outline">
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

                    <CardContent>
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
                                <Button variant="outline">
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
                                <Button variant="destructive">
                                    Delete
                                </Button>
                            </ItemActions>
                        </Item>
                    </CardContent>
                </Card>

            </div>
        </>
    );
};

export default AccountPanel;