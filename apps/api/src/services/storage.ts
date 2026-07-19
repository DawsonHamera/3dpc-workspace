export class R2Storage {
    constructor(
        private bucket: R2Bucket
    ) { }

    async upload(
        key: string,
        file: File
    ) {
        await this.bucket.put(
            key,
            file.stream(),
            {
                httpMetadata: {
                    contentType: file.type,
                },
            }
        );
    }
    
    async delete(
        key: string
    ) {
        await this.bucket.delete(key);
    }

    async get(
        key: string
    ) {
        return this.bucket.get(key);
    }
}