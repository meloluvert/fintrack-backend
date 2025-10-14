import fs from "fs";
import path from "path";
import prismaClient from "../../prisma";
import { formatTransaction } from "../../utils/formatTransaction";
import { DeleteTransactionRequest } from "../../models/interfaces/transaction/DeleteTransactionRequest";
export class DeleteTransactionService {
  async execute({ id, user_id }: DeleteTransactionRequest) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new Error("Transação não encontrada");
    }

    if (transaction.user_id !== user_id) {
      throw new Error("Você não tem permissão para excluir esta transação");
    }

    if (transaction.file_url) {
      const filePath = path.resolve("uploads", transaction.file_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const deletedTransaction = await prismaClient.transaction.delete({
      where: { id },
      include: { category: true },
    });

    return formatTransaction(deletedTransaction);
  }
}
