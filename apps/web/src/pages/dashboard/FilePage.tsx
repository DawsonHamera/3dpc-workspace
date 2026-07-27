import { Spinner } from "@/components/ui/spinner";
import { useGetFileById, type FileRecord } from "@/features/files/hooks/useGetFileById";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentEditor } from "../../features/files/components/DocumentEditor";
import { useDownloadFile } from "@/features/files/hooks/useDownloadFile";
import { ImageViewer } from "../../features/files/components/ImageViewer";
import { DocumentViewer } from "../../features/files/components/DocumentViewer";
import { documentAdapter } from "../../features/files/adapters/documentAdapter";
import { imageAdapter } from "../../features/files/adapters/imageAdapter";
import { useFileContent } from "@/features/files/hooks/useFileContent";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { modelAdapter } from "@/features/files/adapters/modelAdapter";
import { ModelViewer } from "@/features/files/components/ModelViewer";

export type FileType = "document" | "image" | "model"; //| "video";

export type FileComponentProps = {
    fileRecord: FileRecord;
    fileContent: any;
    projectSlug: string;
};

export type FileRegistryEntry = {
    viewer: React.ComponentType<any>;
    editor?: React.ComponentType<any>;
    adapter: (
        source: Blob,
        fileRecord: FileRecord
    ) => Promise<unknown>;
    template?: string;
};
export const registry: Record<FileType, FileRegistryEntry> = {
    document: {
        viewer: DocumentViewer,
        editor: DocumentEditor,
        adapter: documentAdapter,
        template: import.meta.env.VITE_DOCUMENT_TEMPLATE_ID,
    },

    image: {
        viewer: ImageViewer,
        adapter: imageAdapter
    },
    model: {
        viewer: ModelViewer,
        adapter: modelAdapter,
    },
};

const slugToProjectNameMap = (slug: string) =>
    slug
        .split("-")
        .map(
            word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");



function FileNotFound() {
    return (
        <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">
                File not found.
            </p>
        </div>
    );
}


function ViewerNotFound() {
    return (
        <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">
                Viewer not found for this file type.
            </p>
        </div>
    );
}

export const FilePanel = () => {

    const {
        slug,
        fileId,
        mode
    } = useParams<{
        slug?: string;
        fileId?: string;
        mode?: "view" | "edit";
    }>();

    const { data: fileRecord, isLoading: loadingFileRecord } = useGetFileById(fileId);

    const { data: fileBlob, isLoading: loadingFileBlob } = useDownloadFile(fileId, {
        staleTime: 0,
        refetchOnMount: true,
    });


    const navigate = useNavigate();

    const {
        data: fileContent,
        isLoading: loadingContent,
    } = useFileContent(fileRecord, fileBlob);


    if (!slug || (!fileRecord && !loadingFileRecord) || (!fileBlob && !loadingFileBlob)) {
        return <FileNotFound />;
    }


    const registryEntry =
        registry[fileRecord?.type as FileType];

    console.log("FilePanel state:", {
        slug,
        fileId,
        mode,
        fileRecord,
        fileBlob,
        fileContent,
        registryEntry,
    });

    if (!registryEntry) {
        return <FileNotFound />;
    }

    const isInitialLoading =
        loadingFileRecord ||
        loadingFileBlob ||
        loadingContent ||
        !fileContent;


    if (isInitialLoading) {
        return <Spinner />;
    }


    const Component =
        (mode === "edit" && registryEntry.editor)
            ? registryEntry.editor
            : registryEntry.viewer;


    if (!fileBlob) {
        return <FileNotFound />;
    }

    if (!Component) {
        return <ViewerNotFound />;
    }

    return (
        <div className="flex flex-1 flex-col gap-6">
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
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            onClick={() =>
                                navigate(
                                    `/dashboard/projects/${slug}`
                                )
                            }
                        >
                            {
                                slugToProjectNameMap(
                                    slug
                                )
                            }
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {fileRecord?.originalName}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Component
                projectSlug={slug}
                fileRecord={fileRecord}
                fileContent={fileContent}
            /></div>
    );

};