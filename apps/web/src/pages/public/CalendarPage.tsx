import { CalendarDays, Clock, MapPin } from "lucide-react";

export default function CalendarPage() {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="mb-10">
                <div className="flex items-start gap-4">
                    <CalendarDays className="h-12 w-12" />

                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">
                            Club Calendar
                        </h1>

                        <p className="mt-2 max-w-2xl text-muted-foreground">
                            Keep up with upcoming club meetings, project
                            work sessions, workshops, competitions, and other
                            3D Printing Club events.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border bg-card p-6">
                    <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />

                        <h2 className="font-semibold">
                            General Meetings
                        </h2>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                        We meet regularly to discuss club projects, learn
                        new skills, work on prints, and collaborate with
                        other members.
                    </p>

                    <p className="mt-4 text-sm font-medium">
                        Meeting times and locations are posted on the calendar
                        below.
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-6">
                    <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />

                        <h2 className="font-semibold">
                            What to Expect
                        </h2>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                        Meetings may include designing projects, learning
                        CAD, preparing prints, maintaining equipment, and
                        sharing ideas for future builds.
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <iframe
                    title="3D Printing Club Calendar"
                    src="https://calendar.google.com/calendar/u/0/newembed?color=%239fe1e7&src=deloro3dpc@gmail.com"
                    className="h-[800px] w-full"
                    frameBorder="0"
                    scrolling="no"
                />
            </div>
        </div>
    );
}