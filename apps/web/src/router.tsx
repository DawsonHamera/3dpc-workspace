import {
    createBrowserRouter,
} from "react-router-dom";

import { redirectIfAuth, requireAuth } from "./features/auth/loaders/AuthLoader";
import { DashboardLayout } from "./layouts/DashboardLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { FilePanel } from "./pages/dashboard/FilePage";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/public/LandingPage-Club";
import CalendarPage from "./pages/public/CalendarPage";
import { PublicLayout } from "./layouts/PublicLayout";
import ContactPage from "./pages/public/ContactPage";
import GalleryPage from "./pages/public/GalleryPage";
import { AccountPage } from "./pages/dashboard/AccountPage";
import { ProjectPage } from "./pages/dashboard/ProjectPage";
import SplashPage from "./pages/dashboard/SplashPage";
import PrinterGuide from "./pages/dashboard/guides/PrinterGuide";
import MaterialGuide from "./pages/dashboard/guides/MaterialGuide";
import ProfilePage from "./pages/dashboard/ProfilePage";
import SafetyGuide from "./pages/dashboard/guides/SafetyGuide";
import ProjectsPage from "./pages/public/ProjectsPage";
import QnaPage from "./pages/public/QnaPage";
import AppLayout from "./layouts/AppLayout";
import { portalLoader } from "./features/auth/loaders/PortalLoader";
import AppSplashPage from "./pages/app/AppSplashPage";
import AppProjectsPage from "./pages/app/AppProjectsPage";
import AppCalendarPage from "./pages/app/AppCalendarPage";
import AppProfilePage from "./pages/app/AppProfilePage";
import AppChatPage from "./pages/app/AppChatPage";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <PublicLayout />,
                children: [
                    {
                        index: true,
                        element: <LandingPage />,
                    },
                    {
                        path: "/calendar",
                        element: <CalendarPage />,
                    },
                    {
                        path: "/contact",
                        element: <ContactPage />,
                    },
                    {
                        path: "/gallery",
                        element: <GalleryPage />,
                    },
                    {
                        path: "/projects",
                        element: <ProjectsPage />,
                    },
                    {
                        path: "/qa",
                        element: <QnaPage />,
                    }
                ],
            },
            {
                path: "/portal",
                loader: portalLoader,
            },
            {
                loader: requireAuth,
                children: [
                    {
                        path: "/dashboard",
                        element: <DashboardLayout />,
                        children: [
                            {
                                index: true,
                                element: <SplashPage />,
                            },
                            {
                                path: "account",
                                element: <AccountPage />,
                            },
                            {
                                path: "profile",
                                element: <ProfilePage />,
                            },
                            {
                                path: "projects/:slug/files/:fileId/:mode",
                                element: <FilePanel />,
                            },
                            {
                                path: "projects/:slug",
                                element: <ProjectPage />,
                            },
                            {
                                path: "guides/printer-guide",
                                element: <PrinterGuide />,
                            },
                            {
                                path: "guides/material-guide",
                                element: <MaterialGuide />,
                            },
                            {
                                path: "guides/safety-guide",
                                element: <SafetyGuide />,
                            }
                        ],
                    },
                ],
            },
            {
                loader: requireAuth,
                children: [
                    {
                        path: "/app",
                        element: <AppLayout />,
                        children: [
                            {
                                index: true,
                                element: <AppSplashPage />,
                            },
                            {
                                path: "projects",
                                element: <AppProjectsPage />,
                            },
                            {
                                path: "calendar",
                                element: <AppCalendarPage />,
                            },
                            {
                                path: "profile",
                                element: <AppProfilePage />,
                            },
                            {
                                path: "chat",
                                element: <AppChatPage />,
                            }
                        ]
                    }
                ]
            },
            {
                loader: redirectIfAuth,
                children: [
                    {
                        path: "/login",
                        element: <LoginPage />,
                    },
                    {
                        path: "/register",
                        element: <RegisterPage />,
                    },
                ],
            },
        ]
    }
]);