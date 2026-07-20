"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BotIcon, BookOpenIcon, BoxIcon, CoinsIcon, GraduationCapIcon, LayoutDashboardIcon, PrinterIcon, SettingsIcon, UsersIcon } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { Progress, ProgressLabel, ProgressValue } from "./ui/progress"
import { useStorageMetrics } from "@/features/metrics/hooks/useStorageMetrics"
import { Separator } from "./ui/separator"


const data = {

  teams: [
    {
      name: "3D Printing Club",
      logo: (
        <BoxIcon />
      ),
      plan: "School",
    },
    {
      name: "Robotics Team",
      logo: (
        <BotIcon />
      ),
      plan: "School",
    },
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon />
      ),
      isActive: true,
    },

    {
      title: "Printing",
      url: "#",
      icon: (
        <PrinterIcon />
      ),
      items: [
        {
          title: "Print Queue",
          url: "/prints/queue",
        },
        {
          title: "Active Printers",
          url: "/printers",
        },
        {
          title: "Print History",
          url: "/prints/history",
        },
      ],
    },

    {
      title: "Designs",
      url: "#",
      icon: (
        <BoxIcon />
      ),
      items: [
        {
          title: "Model Library",
          url: "/models",
        },
        {
          title: "Upload Model",
          url: "/models/upload",
        },
        {
          title: "My Designs",
          url: "/models/mine",
        },
      ],
    },

    {
      title: "Club Management",
      url: "#",
      icon: (
        <UsersIcon />
      ),
      items: [
        {
          title: "Members",
          url: "/members",
        },
        {
          title: "Projects",
          url: "/projects",
        },
        {
          title: "Announcements",
          url: "/announcements",
        },
      ],
    },

    {
      title: "Resources",
      url: "#",
      icon: (
        <BookOpenIcon />
      ),
      items: [
        {
          title: "Printer Guides",
          url: "/guides/printers",
        },
        {
          title: "Filament Guide",
          url: "/guides/materials",
        },
        {
          title: "Safety",
          url: "/guides/safety",
        },
      ],
    },

    {
      title: "Settings",
      url: "#",
      icon: (
        <SettingsIcon />
      ),
      items: [
        {
          title: "Profile",
          url: "/settings/profile",
        },
        {
          title: "Club Settings",
          url: "/settings/club",
        },
      ],
    },
  ],

  projects: [
    {
      name: "Squirrel Robotics Enclosure",
      url: "/projects/squirrel-enclosure",
      icon: (
        <BoxIcon />
      ),
    },
    {
      name: "Senior Capstone Prints",
      url: "/projects/capstone",
      icon: (
        <GraduationCapIcon />
      ),
    },
    {
      name: "Fundraiser Fidgets",
      url: "/projects/fidgets",
      icon: (
        <CoinsIcon />
      ),
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: userData, isLoading } = useAuth();

  const user = userData?.user;

  const { data: storageMetrics, isLoading: isStorageLoading, error } = useStorageMetrics();

  const API_URL = import.meta.env.VITE_API_URL ?? "";

  console.log(user)
  const avatarUrl = user?.avatarId
    ? `${API_URL}/files/${user.avatarId}`
    : "/default-avatar.png";

  if (isLoading || !user) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="gap-5">
        <Progress value={storageMetrics?.percentage || 0} className="w-full max-w-sm">
          <ProgressLabel>Club Storage</ProgressLabel>
          <ProgressValue />
        </Progress>
        <NavUser user={{ ...user, avatar: avatarUrl }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
