import fs from "fs";
import path from "path";
import { formatTransaction } from "../../utils/formatTransaction";
import prismaClient from "../../prisma";
import type { EditTransactionRequest } from "../../models/interfaces/transaction/EditTransactionRequest";
import { UpdateMonthlyReportService } from "../monthly_reports/UpdateMonthlyReportService";
import { getBrazilMonthYear } from "../../utils/date";
export class EditTransactionService {
  async execute({
    id,
    user_id,
    category_id,
    name,
    date,
    description,
    amount,
    type,
    file_url,
    file,
  }: EditTransactionRequest) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new Error("Transação não encontrada");
    }

    let newFileUrl = transaction.file_url;
    if (file) {
      if (transaction.file_url !== file.filename) {
        if (transaction.file_url) {
          const oldPath = path.resolve("uploads", transaction.file_url);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }

        newFileUrl = file.filename;
      }
    } else if (!file_url || file_url != newFileUrl) {
      if (transaction.file_url) {
        const oldPath = path.resolve("uploads", transaction.file_url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      newFileUrl = null;
    }
    const formattedType = type.toUpperCase() as "INCOME" | "EXPENSE";
    const updatedTransaction = await prismaClient.transaction.update({
      where: { id },
      data: {
        user_id,
        category_id,
        description,
        name,
        date: new Date(date),
        amount: amount,
        type: formattedType,
        file_url: newFileUrl,
      },
      include: {
        category: true,
      },
    });


    //relatorios mensais...
    const updateMonthlyReportService = new UpdateMonthlyReportService();

    const { month: oldMonth, year: oldYear } = getBrazilMonthYear(new Date(transaction.date));
    await updateMonthlyReportService.execute({
      user_id,
      month: oldMonth,
      year: oldYear,
    });

    const { month: newMonth, year: newYear } = getBrazilMonthYear(new Date(date));
    await updateMonthlyReportService.execute({
      user_id,
      month: newMonth,
      year: newYear,
    });

    return formatTransaction(updatedTransaction);
  }
  
}
