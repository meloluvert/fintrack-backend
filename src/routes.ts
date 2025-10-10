import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";
 const router = Router();
router.get("/test", (request: Request, response: Response) => {
    return response.json({ ok: true });
});


router.post("/users", new UserController().store)
router.post("/auth", new UserController().login)
export {router}