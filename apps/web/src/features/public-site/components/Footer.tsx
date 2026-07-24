import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="border-t py-12">

            <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 lg:flex-row">

                <div>

                    <h3 className="font-semibold">
                        3D Printing Club
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        Learn. Build. Share.
                    </p>

                </div>

                <div className="flex gap-8 text-sm text-muted-foreground">

                    <Link to="/calendar">
                        Calendar
                    </Link>
                    <Link to="/gallery">
                        Gallery
                    </Link>
                    <Link to="/contact">
                        Contact
                    </Link>

                </div>

            </div>

        </footer>
    );
}