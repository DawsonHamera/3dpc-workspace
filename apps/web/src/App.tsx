import { isPWAInstalled } from "./hooks/useUtils";
import { useAuth } from "./features/auth/hooks/useAuth";
import { OneSignalProvider } from "./services/OneSignalProvider";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { RequireAuth } from "./components/auth/RequireAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegisterPage";
import AccountPanel from "./pages/dashboard/AccountPanel";
import { Spinner } from "./components/ui/spinner";
import { ProjectPanel } from "./pages/dashboard/ProjectPanel";


export function RedirectIfAuth() {
    const {
        data,
        isLoading,
        error
    } = useAuth();

    if (isLoading) {
        return <Spinner />;
    }

    if (data) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}



const App: React.FC = () => {

    //Temp comment to test auto-deployment. Remove this comment after testing. Second comment to test auto-deployment. Remove this comment after testing.

    return (
        <OneSignalProvider>
            <Routes>
                <Route element={<RequireAuth />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="account" element={<AccountPanel />} />
                        <Route path="project/:slug" element={<ProjectPanel />} />
                    </Route>
                </Route>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route element={<RedirectIfAuth />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Routes>
        </OneSignalProvider>
    );
};

export default App;
