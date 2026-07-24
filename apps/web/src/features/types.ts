export type ApiError = {
    error: {
        code: string;
        message: string;
        details?: { path: (string | number)[]; message: string; }[];
    };
};