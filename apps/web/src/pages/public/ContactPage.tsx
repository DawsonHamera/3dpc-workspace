import { Mail, MapPin, Clock, MessageCircle, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function ContactPage() {

    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-6 py-16">

            <div className="mx-auto max-w-3xl text-center">

                <h1 className="text-4xl font-bold">
                    Get in Touch
                </h1>

                <p className="mt-4 text-lg text-muted-foreground">
                    Have a question, need help with a printer, or want to learn
                    more about the club? We'd love to hear from you.
                </p>

            </div>


            <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">

                <Card>
                    <CardContent className="flex flex-col items-center gap-3 p-6 text-center">

                        <Mail className="h-8 w-8 text-primary" />

                        <h2 className="font-semibold">
                            Email
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Contact the club team with questions or ideas.
                        </p>

                        <Button variant="link">
                            deloro3dpc@gmail.com
                        </Button>

                    </CardContent>
                </Card>


                <Card>
                    <CardContent className="flex flex-col items-center gap-3 p-6 text-center">

                        <MapPin className="h-8 w-8 text-primary" />

                        <h2 className="font-semibold">
                            Find Us
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Visit us during meetings or before school.
                        </p>

                        <Button variant="link" onClick={() => window.open("https://maps.app.goo.gl/uqgjWcxBStn44dEa6", "_blank")}>
                            <MapPin className=" h-4 w-4" />
                            Room 117, Del Oro High School
                        </Button>

                    </CardContent>
                </Card>


                <Card>
                    <CardContent className="flex flex-col items-center gap-3 p-6 text-center">

                        <Clock className="h-8 w-8 text-primary" />

                        <h2 className="font-semibold">
                            Meetings
                        </h2>

                        <div className="space-y-1 text-sm text-muted-foreground">
                            <p className="text-foreground">
                                Thursdays
                            </p>
                            <p>12:04 PM - 12:34 PM (Lunch)</p>
                              <Button variant="link" onClick={() => navigate("/calendar")}>
                            <Calendar className=" h-4 w-4" />
                                Check calendar for more details
                        </Button>
                        </div>

                    </CardContent>
                </Card>

            </div>


            <div className="mx-auto mt-16 max-w-4xl rounded-3xl border bg-muted/40 p-10 text-center">

                <MessageCircle className="mx-auto h-10 w-10 text-primary" />

                <h2 className="mt-4 text-3xl font-bold">
                    Need help with a project?
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    You don't have to be a club member to ask questions. If you
                    need help with a 3D printer, CAD design, or a project idea,
                    stop by and we'll help you get started.
                </p>

                <Button className="mt-6">
                    <a
                        href={`mailto:deloro3dpc@gmail.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ask for Help
                    </a>
                </Button>

            </div>

        </div>
    );
}