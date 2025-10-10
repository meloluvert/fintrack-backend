import prismaClient from "../../prisma";

import type { EditCategoryRequest } from "../../models/interfaces/category/EditCategoryService";


export class EditCategoryService {
  async execute({ id, user_id, name }: EditCategoryRequest) {
    if (!id || !user_id) {
      throw new Error("Requisição inválida");
    }

    if (!name || name.trim() === "") {
      throw new Error("Nome da categoria é obrigatório");
    }

    const existing = await prismaClient.category.findFirst({
      where: { id, user_id },
    });

    if (!existing) {
      throw new Error("Categoria não encontrada ou não pertence ao usuário");
    }

    const updated = await prismaClient.category.update({
      where: { id },
      data: { name },
    });

    return updated;
  }
}
