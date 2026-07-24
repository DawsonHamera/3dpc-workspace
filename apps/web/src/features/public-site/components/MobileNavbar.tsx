import { Link, NavLink } from "react-router-dom";
import {
    CalendarDays,
    FolderKanban,
    GalleryHorizontal,
    Home,
    LayoutPanelLeft,
    LogIn,
    Mail,
    Menu,
    MessagesSquare,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export const MobileNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between px-4">

                <Link
                    to="/"
                    className="flex items-center gap-2 font-semibold"
                >
                    <img
                        src="/images/logo.png"
                        alt="3DPC"
                        className="h-9 w-9"
                    />
                    <span>3DPC</span>
                </Link>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger>
                        <Button
                            variant="ghost"
                            size="icon"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-72">
                        <SheetHeader className="flex flex-row items-center gap-3 pl-4">
                            <img
                                src="/images/logo.png"
                                alt="3DPC"
                                className="h-9 w-9"
                            />
                            <SheetTitle className="text-lg font-semibold">
                                3DPC
                            </SheetTitle>
                        </SheetHeader>

                        <nav className="flex flex-col gap-1 px-2">

                            <NavItem
                                to="/"
                                icon={Home}
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </NavItem>

                            <NavItem
                                to="/projects"
                                icon={FolderKanban}
                                onClick={() => setIsOpen(false)}
                            >
                                Projects
                            </NavItem>

                            <NavItem
                                to="/calendar"
                                icon={CalendarDays}
                                onClick={() => setIsOpen(false)}
                            >
                                Calendar
                            </NavItem>

                            <NavItem
                                to="/qa"
                                icon={MessagesSquare}
                                onClick={() => setIsOpen(false)}
                            >
                                Q&A
                            </NavItem>

                            <NavItem
                                to="/gallery"
                                icon={GalleryHorizontal}
                                onClick={() => setIsOpen(false)}
                            >
                                Gallery
                            </NavItem>

                            <NavItem
                                to="/contact"
                                icon={Mail}
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </NavItem>

                            <Separator className="my-4" />

                            <Link
                                to="/app"
                                className={buttonVariants({
                                    className: "w-full",
                                })}
                            >
                                <LogIn className="h-4 w-4" />
                                Go to App
                            </Link>

                        </nav>
                    </SheetContent>
                </Sheet>

            </div>
        </header>
    );
};

interface NavItemProps {
    to: string;
    icon: React.ElementType;
    children: React.ReactNode;
    onClick?: () => void;
}

function NavItem({
    to,
    icon: Icon,
    children,
    onClick,
}: NavItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                    isActive
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted",
                ].join(" ")
            }
            onClick={onClick}
        >
            <Icon className="h-5 w-5" />
            <span>{children}</span>
        </NavLink>
    );
}