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
        date: "July 13, 2026",
        status: "complete",
    },

    {
        title: "Authentication System",
        description:
            "Implemented user registration, login, protected routes, sessions, profiles, and role-based access.",
        date: "July 15, 2026",
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
            "Created project workspaces with members, visibility settings, project pages, project-specific resources, and member management.",
        date: "July 22, 2026",
        status: "complete",
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

    {
        title: "3D Model Preview System",
        description:
            "Added browser-based previews for supported 3D files, allowing members to inspect models directly within project workspaces.",
        date: "July 25, 2026",
        status: "complete",
    },

    {
        title: "Project Resource System",
        description:
            "Built a unified project resource system for managing files and external resources within project workspaces, including list and grid views.",
        date: "August 2026",
        status: "complete",
    },

    {
        title: "Onshape Integration",
        description:
            "Integrated Onshape with project resources, allowing members to connect their Onshape account and add Onshape documents directly to project workspaces.",
        date: "August 2026",
        status: "complete",
    },

    {
        title: "Onshape Resource Thumbnails",
        description:
            "Added Onshape document thumbnails to project resources with API-side retrieval and graceful fallback behavior when thumbnails cannot be loaded.",
        date: "August 2026",
        status: "complete",
    },

    {
        title: "Project Resource Management",
        description:
            "Added resource actions, deletion handling, duplicate resource detection, resource refreshing, and project-specific resource management.",
        date: "August 2026",
        status: "complete",
    },
        {
        title: "Magic Link Authentication",
        description:
            "Added passwordless email authentication with single-use magic login links, token expiration, session creation, and automatic cleanup of consumed tokens.",
        date: "August 19, 2026",
        status: "complete",
    },

    {
        title: "Expanded File Viewer System",
        description:
            "Expanded the file viewer architecture with support for PDF documents and a unified registry-based system for document, image, and 3D model viewers.",
        date: "August 19, 2026",
        status: "complete",
    },

    {
        title: "Member & Admin Dashboard Experience",
        description:
            "Added dedicated dashboard experiences for members, guests, and administrators, including onboarding guidance, project overviews, administrative tools, and activity monitoring.",
        date: "August 19, 2026",
        status: "complete",
    },

    // Future Features
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
            "Expand projects with activity feeds, task tracking, project updates, and additional collaboration tools.",
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
            "Added 3D model previews to projects, allowing users to view and interact with supported 3D models directly in the browser.",
        date: "July 25, 2026",
    },

    {
        title: "Added Theme Toggle",
        description:
            "Added a theme toggle to the dashboard, allowing users to switch between light and dark modes.",
        date: "July 26, 2026",
    },

    {
        title: "Improved Project Workspace Layout",
        description:
            "Updated project pages with a featured header, improved organization, and a scalable tab-based structure for future project features.",
        date: "July 27, 2026",
    },

    {
        title: "Added Project Member Invites",
        description:
            "Added the ability to search for users, invite members to projects, and remove existing members through the project management interface.",
        date: "July 28, 2026",
    },

    {
        title: "Added Project Resource Explorer",
        description:
            "Introduced a dedicated resource explorer with searchable resources, list and grid views, resource actions, and project-specific resource management.",
        date: "August 2026",
    },

    {
        title: "Added Onshape Account Connections",
        description:
            "Added OAuth-based Onshape account connections, allowing users to connect and manage their Onshape account from account settings.",
        date: "August 2026",
    },

    {
        title: "Added Onshape Project Resources",
        description:
            "Added support for attaching Onshape documents to projects as resources and opening linked documents directly from the project workspace.",
        date: "August 2026",
    },

    {
        title: "Added Onshape Document Thumbnails",
        description:
            "Added Onshape document thumbnails to resource cards and list items with loading states and fallback icons when thumbnails are unavailable.",
        date: "August 2026",
    },

    {
        title: "Improved Resource Management",
        description:
            "Added resource deletion, duplicate detection, refresh controls, and reusable resource mutation handling across resource types.",
        date: "August 2026",
    },

        {
        title: "Added Magic Link Login",
        description:
            "Added passwordless login through single-use email authentication links with automatic expiration and session creation.",
        date: "August 19, 2026",
    },

    {
        title: "Expanded File Viewing",
        description:
            "Added PDF viewing and improved the file viewer architecture so different file types can use dedicated viewers and adapters.",
        date: "August 19, 2026",
    },

    {
        title: "Added Member Onboarding Dashboard",
        description:
            "Added a new member landing experience focused on getting started with the club, including account setup, profile customization, resources, projects, and club tools.",
        date: "August 19, 2026",
    },

    {
        title: "Added Administrative Dashboard",
        description:
            "Added an administrator-focused dashboard with project overviews, administrative shortcuts, and a prominent view of recent workspace activity.",
        date: "August 19, 2026",
    },

    {
        title: "Improved Guest Experience",
        description:
            "Updated the guest dashboard to better support pending members, visitors, and users exploring the club before receiving full membership access.",
        date: "August 19, 2026",
    },

    {
        title: "Improved Account Settings",
        description:
            "Expanded account settings with profile picture management, password updates, preferences, and Onshape account connections, with support for linking directly to specific settings.",
        date: "August 19, 2026",
    },
];
