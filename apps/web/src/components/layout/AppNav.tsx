"use client";

import {
    CalendarDays,
    FolderKanban,
    Home,
    MessageCircle,
    User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigation = [
    {
        name: "Home",
        to: "/app",
        icon: Home,
    },
    {
        name: "Projects",
        to: "/app/projects",
        icon: FolderKanban,
    },
    {
        name: "Chat",
        to: "/app/chat",
        icon: MessageCircle,
    },
    {
        name: "Calendar",
        to: "/app/calendar",
        icon: CalendarDays,
    },
    {
        name: "Profile",
        to: "/app/profile",
        icon: User,
    },
];

export function AppNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background">
            <div className="grid h-16 grid-cols-5">

                {navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                [
                                    "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground",
                                ].join(" ")
                            }
                        >
                            <Icon className="h-5 w-5" />

                            <span>
                                {item.name}
                            </span>
                        </NavLink>
                    );
                })}

            </div>
        </nav>
    );
}