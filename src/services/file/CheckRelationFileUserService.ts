import prismaClient from "../../prisma";

import type { CheckFileByUserRequest } from "../../models/interfaces/file/CheckFileByUserRequest";
export class CheckFileByUserService {
  async execute({ user_id, file_url }: CheckFileByUserRequest) {
    if (!user_id) {
      throw new Error("Usuário não identificado.");
    }
    if (!file_url || file_url.trim() === "") {
      throw new Error("Arquivo não informado.");
    }

    const transaction = await prismaClient.transaction.findFirst({
      where: {
        user_id,
        file_url,
      },
      select: {
        id: true,
        user_id: true,
        file_url: true,
        name: true,
        category_id: true,
      },
    });

    if (!transaction) {
      throw new Error("Usuário não autorizado a acessar");
    }

    return transaction;
  }
}
