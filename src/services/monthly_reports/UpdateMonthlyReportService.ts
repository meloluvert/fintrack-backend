import prismaClient from "../../prisma";
import { UpdateMonthlyReportRequest } from "../../models/interfaces/monthly_report/UpdateMonthlyReportRequest";
import { Month } from "../../generated/prisma";
import { numberToEnumMonth } from "../../utils/numberToEnumMonth";
export class UpdateMonthlyReportService {
  async execute({ user_id, year, month }: UpdateMonthlyReportRequest) {
    const startDate = new Date(Date.UTC(year, month - 1, 1, 3)); // início do mês
    const endDate = new Date(Date.UTC(year, month, 1, 3)); // início do próximo mês


   const monthEnum = numberToEnumMonth(month)
    
    const transactions = await prismaClient.transaction.findMany({
      where: {
        user_id,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    let total_income = 0;
    let total_expense = 0;

    for (const t of transactions) {
      if (t.type === "INCOME") total_income += t.amount;
      else if (t.type === "EXPENSE") total_expense += t.amount;
    }

    const report = await prismaClient.monthlyReport.upsert({
      where: {
        user_id_month_year: { user_id, month:monthEnum, year },
      },
      update: {
        total_income,
        total_expense,
      },
      create: {
        user_id,
        month:monthEnum,
        year,
        total_income,
        total_expense,
      },
    });

    if(report.total_expense) report.total_expense = report.total_expense/100 
    if(report.total_income) report.total_income = report.total_income/100 
    return report;
  }
}
