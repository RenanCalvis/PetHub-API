import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { CustomError } from '../errors/CustomError';

export class UserController {
  static async store(req: Request, res: Response): Promise<any> {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res
        .status(500)
        .json({ message: 'Erro do Servidor.', error: `${error}` });
    }
  }
  static async show(req: Request, res: Response): Promise<any> {
    try {
      const user = await UserService.getUserByID(Number(req.params.id));
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro do Servidor.' });
    }
  }
}
