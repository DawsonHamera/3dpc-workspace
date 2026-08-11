export type OnshapeDocument = {
    id: string;
    name: string;
    thumbnail?: {
        sizes?: {
            size: string;
            href: string;
        }[];
    };

    defaultWorkspace?: {
        id: string;
        name?: string;
    };

    defaultElementId?: string | null;

    description?: string | null;

    createdAt?: string;
    modifiedAt?: string;
};