import {
    Download,
    ImageIcon,
    Maximize2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { ProjectFile } from "@/features/projects/components/ProjectFilesTable";
import { Spinner } from "@/components/ui/spinner";
import { useRef, useState } from "react";


type ImageViewerProps = {
    projectSlug: string;
    fileRecord: ProjectFile;
    fileContent: string;
};


export const ImageViewer = ({
    projectSlug,
    fileRecord,
    fileContent,
}: ImageViewerProps) => {

    const viewerRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(false);

    const toggleFullscreen = async () => {
        if (!viewerRef.current) return;

        if (!document.fullscreenElement) {
            await viewerRef.current.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    };


    console.log("ImageViewer props:", { projectSlug, fileRecord, fileContent });
    return (
        <div className="flex flex-1 flex-col gap-6">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="rounded-lg border p-2">
                        <ImageIcon className="h-5 w-5" />
                    </div>


                    <div>
                        <h1 className="font-semibold">
                            {fileRecord.originalName}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            {fileRecord.type} • {fileRecord.size} bytes
                        </p>
                    </div>

                </div>


                <div className="flex gap-2">

                    <a href={fileContent} target="_blank" rel="noopener noreferrer" download={fileRecord.originalName}>
                        <Button
                            variant="outline"
                            size="icon"
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                    </a>

                    <Button
                        onClick={toggleFullscreen}
                        variant="outline"
                        size="icon"
                    >
                        <Maximize2 className="h-4 w-4" />
                    </Button>

                </div>

            </div>



            {/* Viewer */}
            <Card className="flex flex-1 overflow-hidden" >

                <CardContent className="flex flex-1 items-center justify-center p-6" ref={viewerRef}>

                    <div className="flex max-h-[75vh] max-w-full items-center justify-center overflow-hidden rounded-lg border bg-muted/30">
                        {loading && <Spinner />}
                        {error && <p className="text-sm text-destructive">Failed to load image</p>}
                        <img
                            src={fileContent}
                            alt={fileRecord.originalName}
                            onLoad={() => setLoading(false)}
                            onError={() => {
                                setLoading(false);
                                setError(true);
                            }}
                            className="max-h-[75vh] max-w-full object-contain"
                        />

                    </div>

                </CardContent>

            </Card>

        </div>
    );
};