import { eq, sql } from "drizzle-orm";
import { files } from "../../db/schema";
import { Db } from "../../types";


export type CreateFileInput = {
    key:string;
    originalName:string;
    mimeType:string;
    size:number;
    type:"image"|"model"|"document"|"video"|"other"|"pdf";
    metadata?:unknown;
    uploadedBy:string;
};


export async function createFileRecord(
    db:Db,
    input:CreateFileInput
){
    const result = await db
        .insert(files)
        .values(input)
        .returning();

    return result[0];
}



export async function findFileById(
    db:Db,
    id:string
){
    const result = await db
        .select()
        .from(files)
        .where(eq(files.id,id))
        .limit(1);

    return result[0] ?? null;
}



export async function updateFileRecord(
    db:Db,
    id:string,
    editedBy:string
){

    const result = await db
        .update(files)
        .set({
            lastEditedBy:editedBy,
            updatedAt:new Date()
        })
        .where(eq(files.id,id))
        .returning();

    return result[0];
}



export async function deleteFileRecord(
    db:Db,
    id:string
){
    await db
        .delete(files)
        .where(eq(files.id,id));
}



export async function getStorageUsage(
    db:Db,
    userId:string
){

    const result = await db
        .select({
            total:sql<number>`
                sum(${files.size})
            `
        })
        .from(files)
        .where(
            eq(files.uploadedBy,userId)
        );


    return Number(result[0]?.total ?? 0);
}