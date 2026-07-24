import { Outlet } from "react-router-dom";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AppNav } from "@/components/layout/AppNav";

export default function AppLayout() {
    return (
        <div className="flex min-h-svh flex-col bg-background">

            {/* Mobile App Bar */}
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur">
                <div className="flex items-center gap-3">
                    <img
                        src="/images/logo.png"
                        alt="3DPC"
                        className="h-9 w-9"
                    />

                    <div className="leading-tight">
                        <p className="font-semibold">
                            3D Printing Club
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Member App
                        </p>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                >
                    <Bell className="h-5 w-5" />
                </Button>
            </header>


            {/* Content */}
            <main className="flex-1 overflow-y-auto pb-20">
                <Outlet />
            </main>


            {/* Bottom Navigation */}
            <AppNav />

        </div>
    );
}