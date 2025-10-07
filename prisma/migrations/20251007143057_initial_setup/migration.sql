/*
  Warnings:

  - You are about to drop the `MonthlyReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MonthlyReport";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "monthly_reports" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "total_income" INTEGER,
    "total_expense" INTEGER,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "monthly_reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "monthly_reports_user_id_month_year_key" ON "monthly_reports"("user_id", "month", "year");
