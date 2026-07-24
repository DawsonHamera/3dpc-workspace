import type { JSONContent } from "@tiptap/react";

export const documentAdapter = async (source: Blob ): Promise<JSONContent> => {
    const text = await source.text();

    return JSON.parse(text);
};