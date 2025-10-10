
import bcrypt from "bcryptjs";
import prismaClient from "../../prisma";
import type { UserRequest } from "../../models/interfaces/user/UserRequest";

export class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    const existingUser = await prismaClient.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await prismaClient.user.create({
      data: { name, email, password: hashedPassword },
    });

    return user;
  }
}
