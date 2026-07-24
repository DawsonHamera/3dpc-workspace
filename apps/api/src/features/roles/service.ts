import { Db } from "../../types";

export default async function getRoleNameById(db: Db, roleId: number): Promise<string> {
    const role = await db.query.roles.findFirst({
        where: (roles, { eq }) => eq(roles.id, roleId),
    });

    if (!role) {
        throw new Error(`Role with ID ${roleId} not found.`);
    }

    return role.name;
}

export async function getRoleByName(db: Db, roleName: string): Promise<number> {
    const role = await db.query.roles.findFirst({
        where: (roles, { eq }) => eq(roles.name, roleName),
    });

    if (!role) {
        throw new Error(`Role with name ${roleName} not found.`);
    }

    return role.id;
}