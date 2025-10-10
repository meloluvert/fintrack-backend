import type { Request, Response } from "express";
import { CreateCategoryService } from "../services/category/CreateCategoryService";
import { EditCategoryService } from "../services/category/EditCategoryService";
import { GetCategoriesByUserService } from "../services/category/GetCategoriesByUserService";

export class CategoryController {
  async store(req: Request, res: Response) {
    const createCategoryService = new CreateCategoryService();
    try {
      const user_id = req.user_id;
      const { name } = req.body;

      const category = await createCategoryService.execute({
        name,
        user_id,
      });

      return res.status(201).json(category);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  async index(req: Request, res: Response) {

    const getCategoriesByUserService = new GetCategoriesByUserService();
    try {
      const user_id = req.user_id;

      
      const categories = getCategoriesByUserService.execute({user_id})

      return res.json(categories);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const editCategoryService = new EditCategoryService();
    try {
      const user_id = req.user_id;
      const { id } = req.params;
      const { name } = req.body;

      const category = await editCategoryService.execute({
        id,
        user_id,
        name,
      });

      return res.json(category);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
