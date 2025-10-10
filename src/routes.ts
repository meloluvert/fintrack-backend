import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";
import { CategoryController } from "./controllers/CategoryController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
 const router = Router();
router.get("/test", (request: Request, response: Response) => {
    return response.json({ ok: true });
});

//User
router.post("/users", new UserController().store)
router.post("/auth", new UserController().login)

//Category
router.post("/categories", isAuthenticated, new CategoryController().store)
router.get("/categories", isAuthenticated, new CategoryController().index )

export {router}