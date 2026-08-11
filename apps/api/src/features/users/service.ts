import {
    deleteUserRecord,
    findUserById,
    findUsersWithRoles,
    searchUsersRepository,
    updateUserAvatarRecord,
    updateUserRecord,
} from "./repository";

import {
    hashToken,
} from "../../lib/crypto";

import {
    verifyUser,
} from "../auth/service";

import {
    AppError,
} from "../../lib/errors";

import {
    getRoleByName,
} from "../roles/service";

import {
    uploadFile,
    removeFile,
} from "../files/service";

import {
    AuditActions,
} from "../../services/auditLog";
import { ServicesContext } from "../../types";
import { hashPassword } from "../../services/password";


export const getUsers = async ({
    services,
}: {
    services: ServicesContext;
}) => {

    return findUsersWithRoles(
        services.db
    );
};



export const getUser = async ({
    services,
    id,
}: {
    services: ServicesContext;
    id:string;
}) => {

    return findUserById(
        services.db,
        id
    );
};



export const removeUser = async ({
    services,
    id,
    deletedBy,
}: {
    services: ServicesContext;
    id:string;
    deletedBy:string;
}) => {

    const {
        db,
        audit,
    } = services;


    const user =
        await findUserById(
            db,
            id
        );


    if(!user){
        throw new AppError(
            404,
            "USER_NOT_FOUND",
            "User not found"
        );
    }


    await deleteUserRecord(
        db,
        id
    );


    await audit.create({
        userId: deletedBy,
        action: AuditActions.USER_REMOVED,
        resourceType:"user",
        resourceId:id,
        description:
            `Deleted user ${user.name}`,
    });


    return user;
};



export const updateUserRole = async ({
    services,
    userId,
    roleName,
    updatedBy,
}: {
    services:ServicesContext;
    userId:string;
    roleName:string;
    updatedBy:string;
}) => {

    const {
        db,
        audit,
    } = services;


    const roleId =
        await getRoleByName(
            db,
            roleName
        );


    const updated =
        await updateUserRecord(
            db,
            userId,
            {
                roleId,
            }
        );


    await audit.create({
        userId:updatedBy,
        action:AuditActions.USER_UPDATED,
        resourceType:"user",
        resourceId:userId,
        description:
            `Updated role to ${roleName}`,
    });


    return updated;
};



export const changeUserPassword = async ({
    services,
    user,
    userId,
    currentPassword,
    newPassword,
}: {
    services:ServicesContext;
    user:{
        id:string;
        email:string;
        role:string;
    };
    userId:string;
    currentPassword?:string;
    newPassword:string;
}) => {

    const {
        db,
        audit,
    } = services;


    const isAdmin =
        user.role === "admin" ||
        user.role === "owner";


    if(!isAdmin){

        if(!currentPassword){
            throw new AppError(
                400,
                "BAD_REQUEST",
                "Current password required"
            );
        }


        const valid =
            await verifyUser(
                db,
                user.email,
                currentPassword
            );


        if(!valid){
            throw new AppError(
                401,
                "INVALID_CREDENTIALS",
                "Invalid password"
            );
        }
    }


    const passwordHash =
        await hashPassword(
            newPassword
        );

    const updated =
        await updateUserRecord(
            db,
            userId,
            {
                passwordHash,
            }
        );


    await audit.create({
        userId:user.id,
        action:AuditActions.USER_UPDATED,
        resourceType:"user",
        resourceId:userId,
        description:
            `Updated password for user ${updated?.name}`,
    });


    return updated;
};



export const updateAvatar = async ({
    services,
    user,
    file,
}: {
    services:ServicesContext;
    user:{
        id:string;
        name?:string;
    };
    file:File;
}) => {

    const {
        db,
    } = services;


    const userData =
        await findUserById(
            db,
            user.id
        );


    if(!userData){
        throw new AppError(
            404,
            "USER_NOT_FOUND",
            "User not found"
        );
    }



    if(userData.avatarFileId){

        await updateUserAvatarRecord(
            db,
            user.id,
            null
        );


        await removeFile({
            services,
            userId:user.id,
            id:userData.avatarFileId,
        });
    }



    const savedFile =
        await uploadFile({
            services,
            file,
            uploadedBy:user.id,
            options:{
                requiredTypes:[
                    "image"
                ],
                maxFileSize:
                    5 * 1024 * 1024,
                location:"avatars",
            },
        });



    await updateUserAvatarRecord(
        db,
        user.id,
        savedFile.id
    );


    await services.audit.create({
        userId:user.id,
        action:AuditActions.USER_UPDATED,
        resourceType:"user",
        resourceId:user.id,
        description:
            `Updated avatar for user ${user.name}`,
    });


    return savedFile;
};


export const searchUsers = async ({
    services,
    query,
    limit,
    excludeUserId
}: {
    services: ServicesContext;
    query?: string;
    limit?: number;
    excludeUserId?: string;
}) => {

    const users =
        await searchUsersRepository(
            services.db,
            query,
            limit
        );



    return users.filter(user => user.id !== excludeUserId);
};