import {
    FileText,
    MessageSquare,
    UserPlus,
    Users,
    Wifi,
    WifiOff,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProjectFileUpload } from "../../useProjectFileUpload";
import { useRef, useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { SelectUsersDialog } from "@/features/users/components/SelectUsersDialog";
import { useInviteProjectMembers } from "../../useInviteProjectMembers";


const statusRepository: Record<string, React.ReactNode> = {
    active: (
        <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-green-400" />
            Active
        </div>
    ),
    inactive: (
        <div className="flex items-center gap-2">
            <WifiOff className="h-4 w-4 text-red-400" />
            Inactive
        </div>
    ),
};


export function ProjectHero() {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [inviteMembersOpen, setInviteMembersOpen] = useState(false);


    const { project } = useProject();

    const inviteMembers = useInviteProjectMembers();

    const handleInviteMembers = async (projectSlug: string, userIds: string[]) => {
        await inviteMembers.mutate({
            projectSlug,
            userIds,
        });
    };

    return (
        <Card className="overflow-hidden p-0">
            <div className="relative h-72 w-full">
                <img
                    src="/images/test-banner.jpg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative flex h-full flex-col justify-between p-8 text-white">
                    <div className="flex justify-end gap-2">
                        <Button variant="secondary">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Chat
                        </Button>

                        <Button variant="secondary" onClick={() => setInviteMembersOpen(true)}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Invite
                        </Button>

                    </div>

                    <div className="space-y-5">
                        <Badge variant="secondary">
                            Project Workspace
                        </Badge>

                        <div>
                            <h1 className="text-4xl font-bold">
                                {project.name}
                            </h1>

                            <p className="mt-2 max-w-2xl text-white/80">
                                Design files, documentation, models and team
                                collaboration all live together in this workspace.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 text-sm text-white/90">

                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {project.members.length} Members
                            </div>

                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                {project.resources.length} Resources
                            </div>

                            {statusRepository[project.status]}
                        </div>

                    </div>

                </div>

            </div>

            <SelectUsersDialog
                open={inviteMembersOpen}
                onOpenChange={setInviteMembersOpen}
                actionLabel="Invite Members"
                onAction={(userIds) => handleInviteMembers(project.slug, userIds)}
            />

        </Card>
    );
}