import { DashboardNav } from "@/components/layout/DashboardNav"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export const DashboardLayout = () => {

    return (
        <SidebarProvider>
            <DashboardNav />
            <SidebarInset>
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}