import { Request, Response } from "express";
import { CreateTransactionService } from "../services/transaction/CreateTransactionService";
import { EditTransactionService } from "../services/transaction/EditTransactionService";
import { GetTransactionsByUserService } from "../services/transaction/GetTransactionsByUserService";
import { DeleteTransactionService } from "../services/transaction/DeleteTransactionService";
import { GetTransactionsByMonthService } from "../services/transaction/GetTransactionByMonthService";
export class TransactionController {
  async store(req: Request, res: Response) {
    const createTransactionService = new CreateTransactionService();

    try {
      const user_id = req.user_id;
      const { category_id, name, amount, type, date, description } = req.body;

      const file_url = req.file ? req.file.filename : null;

      const transaction = await createTransactionService.execute({
        user_id,
        category_id,
        name,
        date,
        description,
        amount: Number(amount) * 100,
        type,
        file_url,
      });

      return res.status(201).json(transaction);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { category_id, name, amount, type, file_url, date, description } =
      req.body;
    const file = req.file;
    const user_id = req.user_id;

    const editTransactionService = new EditTransactionService();

    const result = await editTransactionService.execute({
      id,
      user_id,
      category_id,
      description,
      name,
      date,
      amount: Number(amount) * 100,
      type,
      file_url,
      file,
    });

    return res.json(result);
  }

  async index(req: Request, res: Response) {
    const getTransactionByUserService = new GetTransactionsByUserService();
    try {
      const user_id = req.user_id;

      const transactions = await getTransactionByUserService.execute({
        user_id,
      });
      return res.json(transactions);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    const user_id = req.user_id;

    const deleteTransactionService = new DeleteTransactionService();

    try {
      const deleted = await deleteTransactionService.execute({ id, user_id });
      return res.status(200).json(deleted);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  async indexByMonth(req: Request, res: Response) {
    const { year, month } = req.params;
    const user_id = req.user_id;
    const getTransactionsByMonthService = new GetTransactionsByMonthService();

    try {
      const transactions = await getTransactionsByMonthService.execute({
        user_id,
        year: Number(year),
        month: Number(month),
      });

      return res.json(transactions);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
