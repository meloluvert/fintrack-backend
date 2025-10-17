import prismaClient from "../../prisma";
import { formatTransaction } from "../../utils/formatTransaction";
import type { GetTransactionByYearMonthRequest } from "../../models/interfaces/transaction/GetTransactionByYearMonthRequest";
import { GetMonthlyReportService } from "../monthly_reports/GetMonthlyReportService";
export class GetTransactionsByMonthService {
  async execute({ user_id, year, month }: GetTransactionByYearMonthRequest) {
    
    const startDate = new Date(Date.UTC(year, month - 1, 1, 3));
    const endDate = new Date(Date.UTC(year, month, 1, 3));

    const transactionsBD = await prismaClient.transaction.findMany({
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
    const getMonthlyReportRequest =  new GetMonthlyReportService()
    const transactions = transactionsBD.map(formatTransaction)
    const monthly_report = await getMonthlyReportRequest.execute({user_id, year, month})
    return {transactions, monthly_report};
  }
}
