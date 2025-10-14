import prismaClient from "../../prisma";
import type { CreateTransactionRequest } from "../../models/interfaces/transaction/CreateTransactionRequest";
import { formatTransaction } from "../../utils/formatTransaction";
import { GetCategoriesByUserService } from "../category/GetCategoriesByUserService";

export class CreateTransactionService {
  async execute({
    user_id,
    category_id,
    name,
    amount,
    type,
    file_url,
  }: CreateTransactionRequest) {
    const getCategoriesByUserService =  new GetCategoriesByUserService()
    if (!user_id) {
      throw new Error("Usuário não identificado");
    }

    const category = await prismaClient.category.findFirst({
      where: {
        id: category_id,
        user_id: user_id,
      },
    });
    
    if (!category) {
      throw new Error("Categoria inválida ou não pertence ao usuário");
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
