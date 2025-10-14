import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";
import { CategoryController } from "./controllers/CategoryController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import multer from 'multer';
import uploadConfig from "./config/multer";
import { TransactionController } from "./controllers/TransactionController";
 const router = Router();
 const upload = multer(uploadConfig.upload("./uploads"));
router.get("/test", (request: Request, response: Response) => {
    return response.json({ ok: true });
});

//User
router.post("/users", new UserController().store)
router.post("/auth", new UserController().login)

//Category
router.post("/categories", isAuthenticated, new CategoryController().store)
router.get("/categories", isAuthenticated, new CategoryController().index )
router.put("/categories/:id", isAuthenticated, new CategoryController().update )
router.delete("/categories/:id", isAuthenticated, new CategoryController().destroy)

//Transaction
router.post("/transactions", upload.single("file"),isAuthenticated, new TransactionController().store)
router.put("/transactions/:id", upload.single("file") ,isAuthenticated, new TransactionController().update )
router.get("/transactions",isAuthenticated, new TransactionController().index)
router.delete("/transactions/:id",isAuthenticated, new TransactionController().destroy)
router.get("/transactions/:year/:month",isAuthenticated, new TransactionController().indexByMonth)

export {router}