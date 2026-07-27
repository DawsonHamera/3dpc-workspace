import { R2Storage } from "../../services/storage";
import { Db } from "../../types";


export type FileType = "image" | "video" | "document" | "other";

export interface UploadFileInput {
    db: Db;
    storage: R2Storage;
    file: File;
    uploadedBy:string;
    location?:string;
}


export interface FileRecordInput {
    key:string;
    originalName:string;
    mimeType:string;
    size:number;
    type: FileType;
    metadata:unknown;
    uploadedBy:string;
}