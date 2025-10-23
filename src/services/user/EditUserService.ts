import prismaClient from "../../prisma";

interface EditUserRequest {
  user_id: string;
  name: string;
}

export class EditUserService {
  async execute({ user_id, name }: EditUserRequest) {
    if (!user_id) {
      throw new Error("Usuário não identificado");
    }

    if (!name || name.trim() === "") {
      throw new Error("O nome é obrigatório");
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: user_id },
      data: { name },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    return updatedUser;
  }
}
