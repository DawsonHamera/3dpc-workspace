import { Spinner } from "@/components/ui/spinner";
import { useGetFileById, type FileRecord } from "@/features/files/hooks/useGetFileById";
import { useParams } from "react-router-dom";
import { DocumentEditor } from "../../features/files/components/DocumentEditor";
import { useDownloadFile } from "@/features/files/hooks/useDownloadFile";
import { ImageViewer } from "../../features/files/components/ImageViewer";
import { DocumentViewer } from "../../features/files/components/DocumentViewer";
import { documentAdapter } from "../../features/files/adapters/documentAdapter";
import { imageAdapter } from "../../features/files/adapters/imageAdapter";
import { useFileContent } from "@/features/files/hooks/useFileContent";

export type FileType = "document" | "image"; //| "model" | "video";

export type FileComponentProps = {
    fileRecord: FileRecord;
    fileContent: any;
    projectSlug: string;
};

export type FileRegistryEntry = {
    viewer: React.ComponentType<any>;
    editor?: React.ComponentType<any>;
    adapter: (source: Blob) => Promise<unknown>;
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
};



function FileNotFound() {
    return (
        <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">
                File not found.
            </p>
        </div>
    );
}


function InvalidUrl() {
    return (
        <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">
                Invalid URL.{" "}
                <a
                    href="/dashboard"
                    className="text-blue-500 underline"
                >
                    Return to dashboard
                </a>
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


    const {
        data: fileContent,
        isLoading: loadingContent,
    } = useFileContent(fileRecord, fileBlob);


    if (!slug || !fileRecord) {
        return <FileNotFound />;
    }


    const registryEntry =
        registry[fileRecord.type as FileType];


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
        mode === "edit"
            ? registryEntry.editor
            : registryEntry.viewer;


    if (!Component || !fileBlob) {
        return <FileNotFound />;
    }

    return (
        <Component
            projectSlug={slug}
            fileRecord={fileRecord}
            fileContent={fileContent}
        />
    );

};