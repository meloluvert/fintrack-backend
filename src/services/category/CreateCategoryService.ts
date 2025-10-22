import type { CreateCategoryRequest } from "../../models/interfaces/category/CreateCategoryRequest";
import prismaClient from "../../prisma";
export class CreateCategoryService {
  async execute({ user_id, name }: CreateCategoryRequest) {
    if (!user_id) {
      throw new Error("Usuário não identificado");
    }

    if (!name || name.trim() === "") {
      throw new Error("Nome da categoria é obrigatório");
    }

    const category = await prismaClient.category.create({
      data: {
        name,
        user_id,
      },
    });

    return category;
  }
}
