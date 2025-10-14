import prismaClient from "../../prisma";
import { formatTransaction } from "../../utils/formatTransaction";
import type { GetTransactionsByUserRequest } from "../../models/interfaces/transaction/GetTransactionsByUserRequest";
export class GetTransactionsByUserService{
    async execute({user_id}:GetTransactionsByUserRequest){ 
        if(!user_id){
            throw new Error("É necessário estar autenticado para consultar as categorias do usuário");
            
        }
        const transactions = await prismaClient.transaction.findMany({
            where:{
                user_id:user_id
            },
            include:{
                category:true
            }
        })
        const formatted = transactions.map(i => formatTransaction(i))
        return formatted
    }
   
}