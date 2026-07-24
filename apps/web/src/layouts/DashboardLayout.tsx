import { AppSidebar } from "@/components/layout/AppSiderbar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout;