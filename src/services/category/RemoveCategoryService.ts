import prismaClient from "../../prisma";
import type { RemoveCategoryRequest } from "../../models/interfaces/category/RemoveCategoryRequest";
export class RemoveCategoryService {
  async execute({ user_id, id }: RemoveCategoryRequest) {
    const category = await prismaClient.category.findFirst({
      where: {
        id: id,
        user_id,
      },
    });

    if (!category) {
      throw new Error("Categoria não encontrada ou não pertence ao usuário.");
    }

    const category_deleted = await prismaClient.category.delete({
      where: { id: id },
    });

    return category_deleted;
  }
}
