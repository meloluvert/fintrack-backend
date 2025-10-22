export interface EditTransactionRequest {
  user_id: string;
  category_id: string;
  name?: string;
  date: string;
  description:string;
  amount: number;
  type: "income" | "expense";
  file_url?: string | null; 
  file?: Express.Multer.File;
  id: string; 
}