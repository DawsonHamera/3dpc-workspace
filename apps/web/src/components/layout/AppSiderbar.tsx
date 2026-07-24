"use client"

import * as React from "react"

import { NavMain } from "@/components/layout/NavMain"
import { NavProjects } from "@/features/projects/components/NavProjects"
import { NavUser } from "@/features/users/components/NavUser"
import { ClubIdentity } from "@/components/layout/ClubIdentity"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BookOpenIcon, BoxIcon, LayoutDashboardIcon, PrinterIcon, SettingsIcon, UsersIcon } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { Progress, ProgressLabel, ProgressValue } from "../ui/progress"
import { useStorageMetrics } from "@/features/metrics/hooks/useStorageMetrics"
import { useProjects } from "@/features/projects/useProjects"
import { useMemo } from "react"
import type { useLocation, useNavigate } from "react-router-dom"

const data: {
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
} = {

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
          onClick: (navigate) => {
              navigate("/dashboard/printers");
          },
        },
        {
          title: "Print History",
          onClick: (navigate) => {
              navigate("/dashboard/printers/history");
          }
        },
      ],
    },

    {
      title: "Designs",
      onClick: (navigate, location) => {
        if (location.pathname !== "/designs") {
          navigate("/dashboard/designs");
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
              navigate("/dashboard/models");
            }
          },
        },
        {
          title: "Upload Model",
          onClick: (navigate, location) => {
            if (location.pathname !== "/models/upload") {
              navigate("/dashboard/models/upload");
            }
          },
        },
        {
          title: "My Designs",
          onClick: (navigate, location) => {
            if (location.pathname !== "/models/mine") {
              navigate("/dashboard/models/mine");
            }
          },
        },
      ],
    },

    {
      title: "Club Management",
      onClick: (navigate, location) => {
        if (location.pathname !== "/management") {
          navigate("/dashboard/management");
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
              navigate("/dashboard/members");
            }
          },
        },
        {
          title: "Projects",
          onClick: (navigate, location) => {
            if (location.pathname !== "/dashboard") {
              navigate("/dashboard/dashboard");
            }
          }
        },
        {
          title: "Announcements",
          onClick: (navigate, location) => {
            if (location.pathname !== "/announcements") {
              navigate("/dashboard/announcements");
            }
          },
        },
      ],
    },

    {
      title: "Resources",
      onClick: (navigate, location) => {
        if (location.pathname !== "/resources") {
          navigate("/dashboard/resources");
        }
      },
      icon: (
        <BookOpenIcon />
      ),
      items: [
        {
          title: "Printer Guide",
          onClick: (navigate, location) => {
            if (location.pathname !== "/guides/printer-guide") {
              navigate("/dashboard/guides/printer-guide");
            }
          },
        },
        {
          title: "Material Guide",
          onClick: (navigate, location) => {
            if (location.pathname !== "/guides/material-guide") {
              navigate("/dashboard/guides/material-guide");
            }
          },
        },
        {
          title: "Safety",
          onClick: (navigate, location) => {
            if (location.pathname !== "/guides/safety-guide") {
              navigate("/dashboard/guides/safety-guide");
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
            if (location.pathname !== "/dashboard/profile") {
              navigate("/dashboard/profile");
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: user, isLoading } = useAuth();

  const { data: projectsData, isLoading: isProjectsLoading } = useProjects();

  const { data: storageMetrics} = useStorageMetrics();

  const projects = useMemo(() => {
    if (isProjectsLoading || !projectsData) {
      return [];
    }

    return projectsData.map((project) => ({
      id: project.id,
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
        <ClubIdentity />
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
