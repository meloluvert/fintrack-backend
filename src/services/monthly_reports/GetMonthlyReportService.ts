import prismaClient from "../../prisma";
import type { GetMonthlyReportRequest } from "../../models/interfaces/monthly_report/GetMonthlyReportRequest";
import { numberToEnumMonth } from "../../utils/numberToEnumMonth";


export class GetMonthlyReportService {
  async execute({ user_id, year, month }: GetMonthlyReportRequest) {
    const monthEnum = numberToEnumMonth(month)

    const report = await prismaClient.monthlyReport.findUnique({
      where: {
        user_id_month_year: {
          user_id,
          month: monthEnum,
          year,
        },
      },
    });

    if (!report) {
      return {
        month: monthEnum,
        year,
        total_income: 0,
        total_expense: 0,
      };
    }
    if(report.total_expense) report.total_expense = report.total_expense/100 
    if(report.total_income) report.total_income = report.total_income/100 
    return report;
  }
}
