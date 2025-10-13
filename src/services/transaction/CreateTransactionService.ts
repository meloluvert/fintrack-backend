import prismaClient from "../../prisma";
import type { CreateTransactionRequest } from "../../models/interfaces/transaction/CreateTransactionRequest";
import { formatTransaction } from "../../utils/formatTransaction";

export class CreateTransactionService {
  async execute({
    user_id,
    category_id,
    name,
    amount,
    type,
    file_url,
  }: CreateTransactionRequest) {
    if (!user_id) {
      throw new Error("Usuário não identificado");
    }

    if (!category_id) {
      throw new Error("Categoria é obrigatória");
    }

    if (!amount || isNaN(amount)) {
      throw new Error("Valor inválido");
    }

    if (type != "income" && type != "expense") {
      throw new Error("Tipo de transação inválido");
    }

    const formattedType = type.toUpperCase() as "INCOME" | "EXPENSE";


    const transaction = await prismaClient.transaction.create({
      data: {
        user_id,
        category_id,
        name,
        amount,
        type: formattedType,
        file_url,
      },
      include:{
        category:true,
      }
    });

    return formatTransaction(transaction) ;
  }
}
