export type DevFeature = {
    title: string;
    description: string;
    date: string;
    status: "complete" | "in-progress" | "planned";
};


export type DevLogEntry = {
    title: string;
    description: string;
    date: string;
};


export const devFeatures: DevFeature[] = [
    {
        title: "React + Hono Platform Migration",
        description:
            "Migrated the application to a modern React frontend with a Hono API backend, Cloudflare Workers, and Neon database infrastructure.",
        date: " July 13, 2026",
        status: "complete",
    },

    {
        title: "Authentication System",
        description:
            "Implemented user registration, login, protected routes, sessions, profiles, and role-based access.",
        date: " July 15, 2026",
        status: "complete",
    },

    {
        title: "File Management & Storage",
        description:
            "Added file uploads, metadata tracking, downloads, deletion handling, and Cloudflare R2 storage integration.",
        date: "July 19, 2026",
        status: "complete",
    },

    {
        title: "Project Management System",
        description:
            "Created projects with members, visibility settings, project pages, and project-specific resources.",
        date: "July 22, 2026",
        status: "in-progress",
    },


    {
        title: "File Editor & Viewer",
        description:
            "Added a unified file viewing system with support for opening project files, editing supported documents, and extending previews for different file types.",
        date: "July 23, 2026",
        status: "complete",
    },

    {
        title: "Mobile Member Experience",
        description:
            "Created a dedicated mobile layout with simplified navigation and mobile-focused pages.",
        date: "July 24, 2026",
        status: "in-progress",
    },

    // Future Features
    {
        title: "Onshape Integration",
        description:
            "Connect project workflows with Onshape to make CAD collaboration easier by linking designs, references, and project resources.",
        date: "Future",
        status: "planned",
    },

    {
        title: "Realtime Club Chat",
        description:
            "Add member communication with project discussions, announcements, and group conversations.",
        date: "Future",
        status: "planned",
    },

    {
        title: "Project Collaboration Tools",
        description:
            "Expand projects with better teamwork features including updates, activity feeds, task tracking, and shared resources.",
        date: "Future",
        status: "planned",
    },

    {
        title: "Mobile Notifications",
        description:
            "Create a notification system for meetings, announcements, project updates, and important club events.",
        date: "Future",
        status: "planned",
    },

    {
        title: "3D Model Preview System",
        description:
            "Add browser-based previews for 3D files, allowing members to inspect models without downloading them.",
        date: "Future",
        status: "planned",
    },

    {
        title: "Printer Management Dashboard",
        description:
            "Create tools for monitoring printers, tracking print jobs, managing maintenance, and viewing printer status.",
        date: "Future",
        status: "planned",
    },

    {
        title: "Member Portfolio Pages",
        description:
            "Allow members to showcase their projects, designs, skills, and contributions to the club.",
        date: "Future",
        status: "planned",
    },

    {
        title: "Competition Management",
        description:
            "Add tools for organizing competition teams, tracking deadlines, sharing resources, and coordinating builds.",
        date: "Future",
        status: "planned",
    },
    {
        title: "Club Events System",
        description:
            "Create a dedicated event management system for meetings, workshops, competitions, and club activities with attendance tracking and reminders.",
        date: "Future",
        status: "planned",
    },
];


export const devLog: DevLogEntry[] = [
    {
        title: "Added Development Tracking Page",
        description:
            "Created an internal changelog to track progress and future improvements.",
        date: "July 2026",
    },
];