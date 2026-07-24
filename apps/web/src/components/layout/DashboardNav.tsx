import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./NavMain";
import { dashboardNav } from "./nav-config";

import { NavProjects } from "@/features/projects/components/NavProjects";
import { NavUser } from "@/features/users/components/NavUser";

import { ClubIdentity } from "@/components/layout/ClubIdentity";

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

import { BoxIcon } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useProjects } from "@/features/projects/useProjects";
import { useStorageMetrics } from "@/features/metrics/hooks/useStorageMetrics";

import { useMemo } from "react";


export function DashboardNav(
  props: React.ComponentProps<typeof Sidebar>
) {

  const { data: user, isLoading } = useAuth();

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
  } = useProjects();


  const { data: storageMetrics } = useStorageMetrics();

  const projects = useMemo(() => {

    if (!projectsData)
      return [];


    return projectsData.map(project => ({
      id: project.id,
      name: project.name,
      slug: project.slug,
      icon: <BoxIcon />,
    }));

  }, [projectsData]);



  if (isLoading || !user)
    return null;



  const avatarUrl =
    user.avatarId
      ? `${import.meta.env.VITE_API_URL}/files/${user.avatarId}/download`
      : "/default-avatar.png";



  return (

    <Sidebar
      collapsible="icon"
      {...props}
    >

      <SidebarHeader>
        <ClubIdentity />
      </SidebarHeader>


      <SidebarContent>

        <NavMain
          items={dashboardNav}
          role={user.role.name}
        />


        <NavProjects
          projects={projects}
          isLoading={isProjectsLoading}
        />

      </SidebarContent>



      <SidebarFooter className="gap-5">

        <Progress
          value={storageMetrics?.percentage ?? 0}
        >

          <ProgressLabel>
            Club Storage
          </ProgressLabel>

          <ProgressValue />

        </Progress>


        <NavUser
          user={{
            ...user,
            avatar: avatarUrl,
          }}
        />

      </SidebarFooter>


      <SidebarRail />

    </Sidebar>
  );
}