import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { ProjectHero } from "./ProjectHero";
import type { ProjectExtended } from "../../useProjectBySlug";

export type ProjectTab = {
    value: string;
    label: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
};

type ProjectLayoutProps = {
    project: ProjectExtended;
    tabs: ProjectTab[];
    defaultTab?: string;
};

export function ProjectLayout({
    project,
    tabs,
    defaultTab,
}: ProjectLayoutProps) {

    const navigate = useNavigate();

    const [tab, setTab] = useState(
        defaultTab ?? tabs[0]?.value ?? "overview"
    );

    return (
        <div className="flex flex-1 flex-col gap-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            Projects
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {project.name}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <ProjectHero />
            <Tabs
                value={tab}
                onValueChange={setTab}
                className="space-y-6"
            >

                <TabsList className="flex flex-wrap">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="gap-2"
                        >
                            {tab.icon}
                            <span>
                                {tab.label}
                            </span>
                        </TabsTrigger>

                    ))}

                </TabsList>
                {tabs.map((tab) => (
                    <TabsContent
                        key={tab.value}
                        value={tab.value}
                    >
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}