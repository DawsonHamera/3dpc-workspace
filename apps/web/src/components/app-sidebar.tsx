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
import { useProjects } from "@/features/projects/useProjects"
import { useMemo } from "react"

const data: {
  teams: {
    name: string
    logo: React.ReactNode
    plan: string
  }[]
  navMain: {
    title: string
    onClick: (navigate: ReturnType<typeof useNavigate>, location: ReturnType<typeof useLocation>) => void
    icon?: React.ReactNode
    isActive?: boolean
    items?: {
      title: string
      onClick: (navigate: ReturnType<typeof useNavigate>, location: ReturnType<typeof useLocation>) => void
    }[]
  }[]
  projects: {
    name: string
    url: string
    icon: React.ReactNode
  }[]
} = {

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
      onClick: (navigate, location) => {
        if (location.pathname !== "/dashboard") {
          navigate("/dashboard");
        }
      },
      icon: (
        <LayoutDashboardIcon />
      ),
      isActive: true,
    },

    {
      title: "Printing",
      onClick: (navigate, location) => {
        if (location.pathname !== "/printing") {
          navigate("/printing");
        }
      },
      icon: (
        <PrinterIcon />
      ),
      items: [
        {
          title: "Print Queue",
          onClick: (navigate, location) => {
            if (location.pathname !== "/dashboard") {
              navigate("/dashboard");
            }
          },
        },
        {
          title: "Active Printers",
          onClick: (navigate, location) => {
              navigate("/printers");
          },
        },
        {
          title: "Print History",
          onClick: (navigate, location) => {
              navigate("/printers/history");
          }
        },
      ],
    },

    {
      title: "Designs",
      onClick: (navigate, location) => {
        if (location.pathname !== "/designs") {
          navigate("/designs");
        }
      },
      icon: (
        <BoxIcon />
      ),
      items: [
        {
          title: "Model Library",
          onClick: (navigate, location) => {
            if (location.pathname !== "/models") {
              navigate("/models");
            }
          },
        },
        {
          title: "Upload Model",
          onClick: (navigate, location) => {
            if (location.pathname !== "/models/upload") {
              navigate("/models/upload");
            }
          },
        },
        {
          title: "My Designs",
          onClick: (navigate, location) => {
            if (location.pathname !== "/models/mine") {
              navigate("/models/mine");
            }
          },
        },
      ],
    },

    {
      title: "Club Management",
      onClick: (navigate, location) => {
        if (location.pathname !== "/management") {
          navigate("/management");
        }
      },
      icon: (
        <UsersIcon />
      ),
      items: [
        {
          title: "Members",
          onClick: (navigate, location) => {
            if (location.pathname !== "/members") {
              navigate("/members");
            }
          },
        },
        {
          title: "Projects",
          onClick: (navigate, location) => {
            if (location.pathname !== "/dashboard") {
              navigate("/dashboard");
            }
          }
        },
        {
          title: "Announcements",
          onClick: (navigate, location) => {
            if (location.pathname !== "/announcements") {
              navigate("/announcements");
            }
          },
        },
      ],
    },

    {
      title: "Resources",
      onClick: (navigate, location) => {
        if (location.pathname !== "/resources") {
          navigate("/resources");
        }
      },
      icon: (
        <BookOpenIcon />
      ),
      items: [
        {
          title: "Printer Guides",
          onClick: (navigate, location) => {
            if (location.pathname !== "/guides/printers") {
              navigate("/guides/printers");
            }
          },
        },
        {
          title: "Filament Guide",
          onClick: (navigate, location) => {
            if (location.pathname !== "/guides/materials") {
              navigate("/guides/materials");
            }
          },
        },
        {
          title: "Safety",
          onClick: (navigate, location) => {
            if (location.pathname !== "/guides/safety") {
              navigate("/guides/safety");
            }
          },
        },
      ],
    },

    {
      title: "Settings",
      onClick: (navigate, location) => {
        if (location.pathname !== "/settings") {
          navigate("/settings");
        }
      },
      icon: (
        <SettingsIcon />
      ),
      items: [
        {
          title: "Profile",
          onClick: (navigate, location) => {
            if (location.pathname !== "/settings/profile") {
              navigate("/settings/profile");
            }
          },
        },
        {
          title: "Club Settings",
          onClick: (navigate, location) => {
            if (location.pathname !== "/settings/club") {
              navigate("/settings/club");
            }
          },
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

  const { data: projectsData, isLoading: isProjectsLoading } = useProjects();

  const user = userData?.user;

  const { data: storageMetrics, isLoading: isStorageLoading, error } = useStorageMetrics();

  const projects = useMemo(() => {
    if (isProjectsLoading || !projectsData) {
      return [];
    }

    return projectsData.map((project) => ({
      name: project.name,
      slug: project.slug,
      icon: (
        <BoxIcon />
      ),
    }));
  }, [projectsData, isProjectsLoading]);

  const API_URL = import.meta.env.VITE_API_URL ?? "";


  const avatarUrl = user?.avatarId
    ? `${API_URL}/files/${user.avatarId}/download`
    : "/default-avatar.png";

  console.log("Avatar URL:", avatarUrl);

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
        <NavProjects projects={projects} isLoading={isProjectsLoading} />
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
