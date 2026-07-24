"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MoreHorizontalIcon, FolderIcon, ArrowRightIcon, Trash2Icon } from "lucide-react"
import { Spinner } from "../../../components/ui/spinner"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDeleteProject } from "../useDeleteProject"
import { DeleteDialog } from "@/components/custom/DeleteDialog"


type NavProjectsProps = {
  projects: {
    id: string
    name: string
    slug: string
    icon: React.ReactNode
  }[]
  isLoading?: boolean
}

export function NavProjects({ projects, isLoading }: NavProjectsProps) {

  const [revealedProjects, setRevealedProjects] = useState(5);
  const [deleteQuery, setDeleteQuery] = useState({
    open: false,
    projectId: "",
  });

  const navigate = useNavigate();

  const deleteProject = useDeleteProject();

  const handleDeleteProject = async (id: string) => {
    await deleteProject.mutate(
      { id },
    );
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex items-center gap-2">
        Projects
        {isLoading && <Spinner />}
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.slice(0, revealedProjects).map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton onClick={() => navigate(`/dashboard/projects/${item.slug}`)}>
              {item.icon}
              <span>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction
                    showOnHover
                    className="aria-expanded:bg-muted"
                  />
                }
              >
                <MoreHorizontalIcon
                />
                <span className="sr-only">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-fit"
                side="right"
                align="start"
              >
                <DropdownMenuItem>
                  <FolderIcon
                  />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowRightIcon
                  />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => setDeleteQuery({ open: true, projectId: item.id })}>
                    <Trash2Icon
                    />
                    <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {projects.length > revealedProjects && (
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-sidebar-foreground/70"
              onClick={() => setRevealedProjects((prev) => prev + 3)}
            >
              <MoreHorizontalIcon className="text-sidebar-foreground/70" />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
        {
          projects.length === 0 && (
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <span>No projects available</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        }
      </SidebarMenu>
      <DeleteDialog
        open={deleteQuery.open}
        onOpenChange={(open) => setDeleteQuery({ ...deleteQuery, open })}
        onConfirm={() => {
          handleDeleteProject(deleteQuery.projectId);
          setDeleteQuery({ ...deleteQuery, open: false });
        }}
      />
    </SidebarGroup>
  )
}
