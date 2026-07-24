"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { BoxIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ClubIdentity() {
  const navigate = useNavigate();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
          onClick={() => navigate("/")}
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground overflow-hidden">
           <img
                        src="/images/logo.png"
                        alt="3DPC"
                        className="h-9 w-9"
                    />
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              3D Printing Club
            </span>

            <span className="truncate text-xs text-muted-foreground">
              Del Oro High School
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}