import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";
import { CategoryController } from "./controllers/CategoryController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CheckFileByUserService } from "./services/file/CheckRelationFileUserService";
import multer from 'multer';
import path, {resolve} from "path";
import fs from "fs";
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


router.get("/files/:filename", isAuthenticated, async (req, res) => {
  const { filename } = req.params;
  const user_id = req.user_id;

  try {
    const checkFileByUserService = new CheckFileByUserService();
    await checkFileByUserService.execute({ user_id, file_url: filename });

    const filePath = resolve("uploads", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Arquivo não encontrado" });
    }

    res.sendFile(filePath);
  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
});

export { router };
