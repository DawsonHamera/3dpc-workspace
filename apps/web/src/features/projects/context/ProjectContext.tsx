import {
    createContext,
    useContext,
} from "react";
import type { ProjectExtended } from "../useProjectBySlug";


type ProjectContextValue = {
    project: ProjectExtended;
};

const ProjectContext =
    createContext<ProjectContextValue | null>(null);


export function ProjectProvider({
    project,
    children,
}: {
    project: ProjectExtended;
    children: React.ReactNode;
}) {
    return (
        <ProjectContext.Provider
            value={{ project }}
        >
            {children}
        </ProjectContext.Provider>
    );
}


export function useProject() {

    const context =
        useContext(ProjectContext);

    if (!context) {
        throw new Error(
            "useProject must be inside ProjectProvider"
        );
    }

    return context;
}