export interface CreateTransactionRequest {
    user_id: string;
    category_id: string;
    name?: string;
    amount: number;
    type: "income" | "expense";
    file_url?: string | null;
    file?: {
      file_url: string
      file_name: string
    }
  }
  