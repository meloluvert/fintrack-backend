

export function convertUTCToBrazil(date: Date): Date {
  const brazilDate = new Date(date.getTime() - 3 * 60 * 60 * 1000);
  return brazilDate;
}

export function getBrazilMonthYear(date: Date): { month: number; year: number } {
  const brazilDate = convertUTCToBrazil(date);

  const month = brazilDate.getMonth() + 1; 
  const year = brazilDate.getFullYear();


  return { month, year };
}
