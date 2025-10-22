import { GetCategoriesByUserRequest } from "../../models/interfaces/category/GetCategoriesByUserRequest";
import prismaClient from "../../prisma";

export class GetCategoriesByUserService {
  async execute({ user_id }: GetCategoriesByUserRequest) {
    if (!user_id) {
        throw new Error("Lembre-se de estar autenticado, tente novamente");
      }
      const categories = await prismaClient.category.findMany({
        where: { user_id },
        orderBy: { created_at: "desc" },
        select:{
          id:true,
          name: true,
          created_at:true,
          updated_at:true
        }
      });
      return categories
  }
}