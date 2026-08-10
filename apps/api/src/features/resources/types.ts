export type FileResource = {
    type: "file";
    file: {
        resourceId: string;
        fileId: string;
    };
};

export type OnshapeResource = {
    type: "onshape";
    onshape: {
        resourceId: string;
        documentId: string;
    };
};

export type Resource =
    | FileResource
    | OnshapeResource;