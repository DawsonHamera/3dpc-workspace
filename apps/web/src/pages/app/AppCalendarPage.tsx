import {
    CalendarDays,
    Clock,
    MapPin,
    TriangleAlert,
    Users,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";


const upcomingEvents = [
    {
        title: "Weekly Club Meeting",
        date: "Friday, March 14",
        time: "3:30 PM",
        location: "Engineering Lab",
        type: "Meeting",
    },
    {
        title: "CAD Workshop",
        date: "Tuesday, March 18",
        time: "3:30 PM",
        location: "Computer Lab",
        type: "Workshop",
    },
    {
        title: "Competition Build Session",
        date: "Friday, March 21",
        time: "After School",
        location: "3DPC Workspace",
        type: "Build",
    },
];


export default function AppCalendarPage() {
    return (
        <div className="space-y-6 px-4 py-6">

            {/* Header */}
            <section>
                <div className="flex items-center gap-3">
                    <CalendarDays className="h-8 w-8 text-primary" />

                    <h1 className="text-3xl font-bold tracking-tight">
                        Calendar
                    </h1>
                </div>

                <p className="mt-2 text-muted-foreground">
                    Meetings, workshops, build sessions, and club events.
                </p>
            </section>



            {/* Regular Meetings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        General Meetings
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">

                    <p className="text-sm text-muted-foreground">
                        Our main club meetings are a time to work on projects,
                        learn new skills, share ideas, and collaborate with
                        other members.
                    </p>

                    <div className="rounded-lg bg-muted p-3 text-sm">
                        <strong>Typical Schedule:</strong>
                        <br />
                       During lunch (12:15 - 12:41)
                    </div>

                </CardContent>
            </Card>



            {/* Upcoming Events */}
            <section className="space-y-4">

                <h2 className="text-xl font-semibold">
                    Upcoming Events
                </h2>
                 <Badge variant="secondary">
                        <TriangleAlert className="h-3 w-3" /> Under Construction
                    </Badge>


                {upcomingEvents.map((event) => (
                    <Card key={event.title}>

                        <CardHeader className="pb-3">

                            <div className="flex items-start justify-between gap-3">

                                <CardTitle className="text-lg">
                                    {event.title}
                                </CardTitle>

                                <Badge>
                                    {event.type}
                                </Badge>

                            </div>

                        </CardHeader>


                        <CardContent className="space-y-2 text-sm text-muted-foreground">

                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />

                                {event.date}
                            </div>


                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />

                                {event.time}
                            </div>


                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />

                                {event.location}
                            </div>

                        </CardContent>

                    </Card>
                ))}

            </section>



            {/* Attendance */}
            <Card>
                <CardContent className="flex items-center gap-3 p-5">

                    <Users className="h-6 w-6 text-primary" />

                    <div>
                        <p className="font-medium">
                            Club Events
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Check the calendar regularly for meetings,
                            competitions, and special events.
                        </p>
                    </div>

                </CardContent>
            </Card>

        </div>
    );
}