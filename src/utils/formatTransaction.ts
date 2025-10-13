
export interface TransactionInput {
  id: string;
  user_id: string;
  category_id: string;
  name?: string | null;
  amount: number;
  type: "INCOME" | "EXPENSE";
  file_url?: string | null;
  date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface TransactionOutput {
  id: string;
  user_id: string;
  name?: string | null;
  amount: number;
  type: "income" | "expense";
  file: { url: string; name: string } | null;
  date: Date;
  created_at: Date;
  updated_at: Date;
}

export function formatTransaction(transaction: TransactionInput): TransactionOutput {
  const { file_url, category_id: _ignore, ...transactionFields } = transaction;

  const formatted = {
    ...transactionFields,
    file: file_url
      ? {
          url: file_url,
          name: file_url.split("-").slice(1).join("-"),
        }
      : null,
  };

  formatted.amount = formatted.amount / 100; 
  formatted.type = formatted.type.toString().toLowerCase() as any;

  return formatted as any;
}
