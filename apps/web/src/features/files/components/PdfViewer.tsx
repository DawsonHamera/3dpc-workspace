import { useState } from "react";
import {
    Document,
    Page,
    pdfjs,
} from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

pdfjs.GlobalWorkerOptions.workerSrc =
    `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
    fileContent: Blob;
};

export function PdfViewer({
    fileContent,
}: Props) {
    const [numPages, setNumPages] =
        useState<number>();

    const [pageNumber, setPageNumber] =
        useState(1);

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-center gap-2 border-b p-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={pageNumber <= 1}
                    onClick={() =>
                        setPageNumber(
                            pageNumber - 1
                        )
                    }
                >
                    Previous
                </Button>

                <span className="text-sm text-muted-foreground">
                    {pageNumber}
                    {numPages
                        ? ` / ${numPages}`
                        : ""}
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    disabled={
                        !numPages ||
                        pageNumber >= numPages
                    }
                    onClick={() =>
                        setPageNumber(
                            pageNumber + 1
                        )
                    }
                >
                    Next
                </Button>
            </div>

            <div className="flex flex-1 justify-center overflow-auto bg-muted/30 p-6">
                <Document
                    file={fileContent}
                    loading={
                        <Spinner />
                    }
                    onLoadSuccess={({
                        numPages,
                    }) => {
                        setNumPages(numPages);
                        setPageNumber(1);
                    }}
                    error={
                        <div className="text-sm text-destructive">
                            Failed to load PDF.
                        </div>
                    }
                >
                    <Page
                        pageNumber={pageNumber}
                        renderTextLayer
                        renderAnnotationLayer
                    />
                </Document>
            </div>
        </div>
    );
}