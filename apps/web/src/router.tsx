import {
    createBrowserRouter,
    Navigate,
} from "react-router-dom";

import { redirectIfAuth, requireAuth } from "./components/auth/AuthLoader";
import Dashboard from "./pages/dashboard/Dashboard";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegisterPage";
import AccountPanel from "./pages/dashboard/AccountPanel";
import { ProjectPanel } from "./pages/dashboard/ProjectPanel";
import { FilePanel } from "./pages/dashboard/FilePanel";
import ErrorPage from "./pages/dashboard/ErrorPage";
import SplashPanel from "./pages/dashboard/SplashPanel";

export const router = createBrowserRouter([
    {
        loader: requireAuth,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
                children: [
                    {
                        index: true,
                        element: <SplashPanel />,
                    },
                    {
                        path: "account",
                        element: <AccountPanel />,
                    },
                    {
                        path: "projects/:slug/files/:fileId/:mode",
                        element: <FilePanel />,
                    },
                    {
                        path: "projects/:slug",
                        element: <ProjectPanel />,
                    },
                ],
            },
        ],
    },
    {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
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
]);