import { isPWAInstalled } from "./hooks/useUtils";
import { useAuth } from "./features/auth/hooks/useAuth";
import { OneSignalProvider } from "./services/OneSignalProvider";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { RequireAuth } from "./components/auth/RequireAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegisterPage";
import AccountPanel from "./pages/dashboard/AccountPanel";


export function RedirectIfAuth() {
    const user = useAuth().data;

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

const App: React.FC = () => {

    return (
        <OneSignalProvider>
            <Routes>
                <Route element={<RequireAuth />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="account" element={<AccountPanel />} />
                    </Route>
                </Route>
                <Route path="/" element={<Dashboard />} />
                <Route element={<RedirectIfAuth />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Routes>
        </OneSignalProvider>
    );
};

export default App;
