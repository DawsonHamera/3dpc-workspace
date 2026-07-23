export const imageAdapter = async (source: Blob): Promise<string> => {
    const url = URL.createObjectURL(source);
    return url;
};
