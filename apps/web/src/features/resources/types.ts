export type FileResource = {
    id: string;
    name: string;
    type: "file";
    createdAt: string;

    file: {
        id: string;
        originalName: string;
        type: string;
        size: number;
    } | null;
};

export type OnshapeResource = {
    id: string;
    name: string;
    type: "onshape";
    createdAt: string;

    onshape: any;
};

export type Resource =
    | FileResource
    | OnshapeResource;