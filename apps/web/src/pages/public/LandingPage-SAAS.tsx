import { ArrowRight, Badge, BookOpen, Boxes, FileText, Layers3, Printer, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featuredProjects = [
  {
    title: "Recreator Recycling Project",
    description:
      "Developing an open-source filament recycling system for classrooms and makerspaces.",
    members: 8,
  },
  {
    title: "Engineering Documentation",
    description:
      "Creating reusable design documentation standards for future club projects.",
    members: 5,
  },
  {
    title: "Campus Rover",
    description:
      "Building a small autonomous robot platform for experimentation and outreach.",
    members: 11,
  },
];

const features = [
  {
    icon: FileText,
    title: "Documents",
    description: "Rich collaborative documentation and project notes.",
  },
  {
    icon: Layers3,
    title: "CAD Workspaces",
    description: "Connect professional CAD tools like Onshape.",
  },
  {
    icon: Printer,
    title: "Manufacturing",
    description: "Organize print jobs and production workflows.",
  },
  {
    icon: Users,
    title: "Teams",
    description: "Project permissions and member collaboration.",
  },
  {
    icon: Boxes,
    title: "Resources",
    description: "Centralized storage for project assets.",
  },
  {
    icon: BookOpen,
    title: "Knowledge",
    description: "Build documentation that grows with every project.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              3D
            </div>

            <span className="text-lg font-semibold">
              3DPC
            </span>
          </div>

          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#" className="hover:text-primary transition-colors">
              Projects
            </a>

            <a href="#" className="hover:text-primary transition-colors">
              Features
            </a>

            <a href="#" className="hover:text-primary transition-colors">
              Community
            </a>

            <a href="#" className="hover:text-primary transition-colors">
              Documentation
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost">
              Login
            </Button>

            <Button>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto grid min-h-[85vh] items-center gap-16 px-6 py-20 lg:grid-cols-2">
        <div className="space-y-8">
          {/* <Badge variant="secondary">
            Built for clubs, makerspaces, and engineering teams
          </Badge> */}

          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">
              Build.
              <br />
              Design.
              <br />
              Collaborate.
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground">
              A collaborative engineering workspace that brings projects,
              documentation, CAD, manufacturing, and teams together in one
              place.
            </p>
          </div>

          <div className="flex gap-4">
            <Button size="lg">
              Get Started
            </Button>

            <Button variant="outline" size="lg">
              Explore Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="rounded-2xl border bg-card shadow-2xl">
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
          </div>

          <div className="grid h-[520px] grid-cols-[220px_1fr]">
            <aside className="border-r bg-muted/40 p-4">
              <div className="mb-6 h-8 rounded bg-primary/20" />

              <div className="space-y-3">
                <div className="h-4 rounded bg-muted" />
                <div className="h-4 rounded bg-muted" />
                <div className="h-4 rounded bg-muted" />
                <div className="h-4 rounded bg-muted" />
                <div className="h-4 rounded bg-muted" />
              </div>
            </aside>

            <main className="space-y-4 p-6">
              <div className="h-8 w-1/2 rounded bg-muted" />

              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 rounded-lg border bg-muted/40" />
                <div className="h-32 rounded-lg border bg-muted/40" />
                <div className="h-32 rounded-lg border bg-muted/40" />
                <div className="h-32 rounded-lg border bg-muted/40" />
              </div>

              <div className="h-44 rounded-lg border bg-muted/40" />
            </main>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-muted/30 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold">
              Everything your projects need
            </h2>

            <p className="mt-3 text-muted-foreground">
              Bring together your engineering workflow without locking yourself
              into one tool.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="space-y-4 p-6">
                  <feature.icon className="h-8 w-8 text-primary" />

                  <div>
                    <h3 className="font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto py-24 px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Featured Projects
            </h2>

            <p className="mt-2 text-muted-foreground">
              Explore work shared by the community.
            </p>
          </div>

          <Button variant="outline">
            View All
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Card
              key={project.title}
              className="transition hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="space-y-4 p-6">
                <Badge>
                  Public
                </Badge>

                <div>
                  <h3 className="text-xl font-semibold">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="text-sm text-muted-foreground">
                  {project.members} Members
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="border-y bg-muted/30 py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            One workspace from idea to finished project
          </h2>

          <div className="mt-16 grid grid-cols-2 gap-8 text-center md:grid-cols-6">
            {[
              "Idea",
              "Document",
              "CAD",
              "Prototype",
              "Manufacture",
              "Share",
            ].map((step) => (
              <div key={step}>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border bg-background text-lg font-semibold">
                  {step[0]}
                </div>

                <p className="font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold">
          Ready to start building?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Join your team, start a new project, and collaborate from concept to
          completion.
        </p>

        <Button size="lg" className="mt-8">
          Create Your Workspace
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t py-10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 text-sm text-muted-foreground md:flex-row">
          <div>
            © 2026 3DPC
          </div>

          <div className="flex gap-6">
            <a href="#">Documentation</a>
            <a href="#">Community</a>
            <a href="#">Contact</a>
            <a href="#" className="flex items-center gap-2">
              <img src="/github.svg" className="h-4 w-4" /> 
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}