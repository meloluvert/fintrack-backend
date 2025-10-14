import prismaClient from "../../prisma";
import { formatTransaction } from "../../utils/formatTransaction";
import type { GetTransactionByYearMonthRequest } from "../../models/interfaces/transaction/GetTransactionByYearMonthRequest";
export class GetTransactionsByMonthService {
  async execute({ user_id, year, month }: GetTransactionByYearMonthRequest) {
    
    // corrigindo fuso-horário para o Brasil
    const startDate = new Date(Date.UTC(year, month - 1, 1, 3));
    const endDate = new Date(Date.UTC(year, month, 1, 3));

    const transactions = await prismaClient.transaction.findMany({
      where: {
        user_id,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: { category: true },
      orderBy: { date: "desc" },
    });

    return transactions.map(formatTransaction);
  }
}
