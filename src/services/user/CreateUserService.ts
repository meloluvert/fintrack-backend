
import bcrypt from "bcryptjs";
import prismaClient from "../../prisma";
import type { UserRequest } from "../../models/interfaces/user/UserRequest";
import { CreateCategoryService } from "../category/CreateCategoryService";

export class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    const existingUser = await prismaClient.user.findUnique({ where: { email } });
    const createCategoryService = new CreateCategoryService()
    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

      const hashedPassword = await bcrypt.hash(password, 8);

    const user = await prismaClient.user.create({
      data: { name, email, password: hashedPassword },
    });

    createCategoryService.execute({user_id:user.id, name:"Supermercado"})
    createCategoryService.execute({user_id:user.id, name:"Alimentação"})
    createCategoryService.execute({user_id:user.id, name:"Salário"})
    createCategoryService.execute({user_id:user.id, name:"Contas"})
    createCategoryService.execute({user_id:user.id, name:"Vestuário"})
    createCategoryService.execute({user_id:user.id, name:"Transporte"})
    createCategoryService.execute({user_id:user.id, name:"Pix"})
    
    return user;
  }
}
