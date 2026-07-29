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
        status: "complete",
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
        title: "New Development Updates Page",
        description:
            "Added a page to track recent improvements, completed features, and upcoming changes to the club portal.",
        date: "July 24, 2026",
    },

    {
        title: "Improved Mobile Experience",
        description:
            "Added a dedicated mobile dashboard layout with mobile-friendly navigation and pages designed specifically for smaller screens.",
        date: "July 24, 2026",
    },

    {
        title: "Account Security Improvements",
        description:
            "Added password management tools and improved account settings.",
        date: "July 24, 2026",
    },

    {
        title: "Admin User Management",
        description:
            "Added tools for administrators to manage members, update roles, and maintain club accounts.",
        date: "July 24, 2026",
    },

    {
        title: "Audit Logging System",
        description:
            "Added administrative activity tracking to record important account and management changes.",
        date: "July 24, 2026",
    },

    {
        title: "Improved Dashboard Navigation",
        description:
            "Updated dashboard navigation with a cleaner structure and improved organization of projects, resources, and club management tools.",
        date: "July 24, 2026",
    },
    {
        title: "Added 3D Model Previews",
        description:
            "Added 3D model previews to projects, allowing users to view and interact with 3D models directly in the browser.",
        date: "July 25, 2026",
    },
    {
        title: "Added theme toggle",
        description:
            "Added a theme toggle to the dashboard, allowing users to switch between light and dark modes.",
        date: "July 26, 2026",
    },
    {
        title: "Improved Project Workspace Layout",
        description:
            "Updated project pages with a featured header, improved organization, and a more scalable tab-based structure for future project features.",
        date: "July 27, 2026",
    },
    {
        title: "Added Project Member Invites",
        description:
            "Added the ability to search for users, invite members to projects, and remove existing members through the project management interface.",
        date: "July 28, 2026",
    },

];