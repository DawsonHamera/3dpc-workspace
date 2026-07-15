import { Hono } from "hono";
import { Env } from "../../types";
import { deleteUser, getUserByIdWithRoles, getUsersWithRoles } from "./service";
import { requireRole } from "../../middleware/role";
import { requireAuth } from "../../middleware/auth";

const usersRoutes = new Hono<Env>()

    .get("/", requireAuth, requireRole("Admin", "Owner"), async (c) => {
        const db = c.get("db");
        const users = await getUsersWithRoles(db);
        return c.json(users);
    })

    .get("/:id", requireAuth, requireRole("Admin", "Owner"), async (c) => {
        const db = c.get("db");
        const { id } = c.req.param();
        const user = await getUserByIdWithRoles(db, id);
        return c.json(user);
    })

    .delete(
        "/:id",
        requireAuth,
        requireRole("Admin", "Owner"),
        async (c) => {
            const db = c.get("db");
            const { id } = c.req.param();
            await deleteUser(db, id);
            return c.json({
                message: "Deleted user",
            });
        }
    );

export default usersRoutes;