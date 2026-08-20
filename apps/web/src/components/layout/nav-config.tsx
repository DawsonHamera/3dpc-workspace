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
            // {
            //     title: "Print Queue",
            //     onClick: (navigate) =>
            //         navigate("/dashboard/printing"),
            // },

            {
                title: "Printers",
                onClick: (navigate) =>
                    navigate("/dashboard/printers"),
            },

            // {
            //     title: "Print History",
            //     onClick: (navigate) =>
            //         navigate("/dashboard/printers/history"),
            // },
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
            {
                title: "Development Updates",
                onClick: (navigate) =>
                    navigate("/dashboard/dev"),
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

            // {
            //     title: "Club Settings",
            //     onClick: (navigate) =>
            //         navigate("/dashboard/settings/club"),
            // },

        ],
    },
];