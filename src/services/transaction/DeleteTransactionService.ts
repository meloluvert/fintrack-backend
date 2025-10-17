import fs from "fs";
import path from "path";
import prismaClient from "../../prisma";
import { formatTransaction } from "../../utils/formatTransaction";
import { DeleteTransactionRequest } from "../../models/interfaces/transaction/DeleteTransactionRequest";
import { getBrazilMonthYear } from "../../utils/date";
import { UpdateMonthlyReportService } from "../monthly_reports/UpdateMonthlyReportService";
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


    const { month, year } = getBrazilMonthYear(new Date(deletedTransaction.date));
    
        const updateMonthlyReportService = new UpdateMonthlyReportService();
        await updateMonthlyReportService.execute({ user_id, month, year });

    return formatTransaction(deletedTransaction);
  }
}
