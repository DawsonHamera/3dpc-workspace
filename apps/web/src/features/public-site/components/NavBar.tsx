import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Link, NavLink } from "react-router-dom";

const navigation = [
    { name: "Projects", to: "/projects" },
    { name: "Q&A", to: "/qa" },
    { name: "Gallery", to: "/gallery" },
    { name: "Calendar", to: "/calendar" },
    { name: "Contact", to: "/contact" },
];

export const NavBar = () => {
    const { data: user } = useAuth();
    const logout = useLogout();
    return (
        <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* Brand */}
                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <img
                        src="/images/logo.png"
                        alt="3DPC"
                        className="h-9 w-9"
                    />

                    <span className="text-lg font-bold">
                        3D Printing Club
                    </span>
                </Link>


                {/* Navigation */}
                <nav className="hidden items-center gap-8 text-sm lg:flex">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                [
                                    "relative pb-1 transition-colors",
                                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent",
                                    isActive
                                        ? "font-medium text-foreground after:opacity-100"
                                        : "text-muted-foreground hover:text-foreground after:opacity-0",
                                    "after:transition-opacity",
                                ].join(" ")
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
                
                {/* Auth */}
                <div className="flex items-center gap-2">
                    <Button >
                        <Link to="/login">
                            {user ? "Go to dashboard" : "Login"}
                        </Link>
                    </Button>
                    {user ?
                        <Button variant="secondary" onClick={async () => await logout.mutateAsync()}>
                            Logout

                        </Button>
                        :
                        <Button variant="secondary">
                            <Link to="/register">
                                Sign Up
                            </Link>
                        </Button>
                    }
                </div>

            </div>
        </header>
    );
};