import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import {
    isRouteErrorResponse,
    useRouteError,
    useNavigate,
} from "react-router-dom";


export default function ErrorPage() {

    const error = useRouteError();
    const navigate = useNavigate();

    let title = "Something went wrong";
    let message = "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`;

        if (error.status === 404) {
            message = "The page you are looking for does not exist.";
        }
    }
    else if (error instanceof Error) {
        message = error.message;
    }


    return (
        <div className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-muted/30
            p-6
        ">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="
                            h-8
                            w-8
                            text-destructive
                        "/>

                        <div>
                            <CardTitle>
                                {title}
                            </CardTitle>

                            <CardDescription>
                                We hit a problem.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="text-sm text-muted-foreground">
                        {message}
                        {import.meta.env.DEV && error instanceof Error && (
                            <pre className="mt-4 overflow-auto text-xs">
                                {error.stack}
                            </pre>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                    <Button
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}