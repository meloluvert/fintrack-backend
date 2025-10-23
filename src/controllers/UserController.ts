import type { UserRequest } from "../models/interfaces/user/UserRequest";
import { Request, Response } from "express";
import { AuthUserService } from "../services/user/AuthUserService";
import { CreateUserService } from "../services/user/CreateUserService";
import { EditUserService } from "../services/user/EditUserService";

export class UserController {
  async store(req: Request, res: Response) {
    const createUserService = new CreateUserService();
    const authUserService = new AuthUserService();
    try {
      const { name, email, password } = req.body as unknown as UserRequest;

      const user = await createUserService.execute({ name, email, password });
      const { token } = await authUserService.execute({ email, password });
      return res.status(201).json({ user, token });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const authUserService = new AuthUserService();

    try {
      const token = await authUserService.execute({ email, password });
      return res.json(token);
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
      const editUserService = new EditUserService();
      try {
        const user_id = req.user_id;
        const { name } = req.body;
  
        const user = await editUserService.execute({
          user_id,
          name,
        });
  
        return res.json(user);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    }
}
