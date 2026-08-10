export type OnshapeDocument = {
    id: string;
    name: string;
    href: string;

    defaultWorkspace?: {
        id: string;
        name?: string;
    };

    defaultElementId?: string | null;

    description?: string | null;

    createdAt?: string;
    modifiedAt?: string;
};