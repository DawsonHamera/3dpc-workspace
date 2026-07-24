import {
    BookOpenIcon,
    BoxIcon,
    Construction,
    LayoutDashboardIcon,
    PrinterIcon,
    SettingsIcon,
    UsersIcon,
} from "lucide-react";

import type { useLocation, useNavigate } from "react-router-dom";


export type NavItem = {
    title: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    titleColor?: string;
    adminOnly?: boolean;

    onClick: (
        navigate: ReturnType<typeof useNavigate>,
        location: ReturnType<typeof useLocation>
    ) => void;

    items?: {
        title: string;
        titleColor?: string;
        adminOnly?: boolean;

        onClick: (
            navigate: ReturnType<typeof useNavigate>,
            location: ReturnType<typeof useLocation>
        ) => void;
    }[];
};


export const dashboardNav: NavItem[] = [

    {
        title: "Dashboard",
        icon: <LayoutDashboardIcon />,
        isActive: true,

        onClick: (navigate) =>
            navigate("/dashboard"),
    },


    {
        title: "Printing",
        icon: <PrinterIcon />,

        onClick: (navigate) =>
            navigate("/dashboard/printing"),

        items: [
            {
                title: "Print Queue",
                onClick: (navigate) =>
                    navigate("/dashboard/printing"),
            },

            {
                title: "Active Printers",
                onClick: (navigate) =>
                    navigate("/dashboard/printers"),
            },

            {
                title: "Print History",
                onClick: (navigate) =>
                    navigate("/dashboard/printers/history"),
            },
        ],
    },


    {
        title: "Designs",
        icon: <BoxIcon />,

        onClick: (navigate) =>
            navigate("/dashboard/models"),

        items: [
            {
                title: "Model Library",
                onClick: (navigate) =>
                    navigate("/dashboard/models"),
            },

            {
                title: "Upload Model",
                onClick: (navigate) =>
                    navigate("/dashboard/models/upload"),
            },

            {
                title: "My Designs",
                onClick: (navigate) =>
                    navigate("/dashboard/models/mine"),
            },
        ],
    },


    {
        title: "Club Management",
        adminOnly: true,
        icon: <UsersIcon />,
        onClick: () => { },

        items: [
            {
                title: "Members",
                onClick: (navigate) =>
                    navigate("/dashboard/manage/users"),
            },

            {
                title: "Logs",
                onClick: (navigate) =>
                    navigate("/dashboard/logs"),
            },

            {
                title: "Announcements",
                onClick: (navigate) =>
                    navigate("/dashboard/announcements"),
            },
        ],
    },

    {
        title: "Resources",
        icon: <BookOpenIcon />,

        onClick: (navigate) =>
            navigate("/dashboard/resources"),

        items: [

            {
                title: "Printer Guide",
                onClick: (navigate) =>
                    navigate("/dashboard/guides/printer-guide"),
            },

            {
                title: "Material Guide",
                onClick: (navigate) =>
                    navigate("/dashboard/guides/material-guide"),
            },

            {
                title: "Safety",
                onClick: (navigate) =>
                    navigate("/dashboard/guides/safety-guide"),
            },

        ],
    },


    {
        title: "Settings",
        icon: <SettingsIcon />,

        onClick: (navigate) =>
            navigate("/dashboard/settings"),

        items: [

            {
                title: "Profile",
                onClick: (navigate) =>
                    navigate("/dashboard/profile"),
            },

            {
                title: "Club Settings",
                onClick: (navigate) =>
                    navigate("/dashboard/settings/club"),
            },

        ],
    },


    {
        title: "Development Updates",
        icon: <Construction className="text-accent" />,

        titleColor: "accent",

        onClick: (navigate) =>
            navigate("/dashboard/dev"),
    },

];