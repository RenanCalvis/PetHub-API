import { Request, Response } from 'express';
import { PetService } from '../services/PetService';
import { CustomError } from '../errors/CustomError';

export class PetController {
  static async store(req: Request, res: Response): Promise<any> {
    try {
      const pet = await PetService.createPet(req.body);
      return res.status(201).json(pet);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro do Servidor.' });
    }
  }

  static async show(req: Request, res: Response): Promise<any> {
    try {
      const pet = await PetService.getPetByID(Number(req.params.id));
      return res.status(200).json(pet);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro do Servidor.' });
    }
  }

  static async index(req: Request, res: Response): Promise<any> {
    try {
      const page = Number(req.query.page) || undefined;
      const limit = Number(req.query.limit) || undefined;
      const pets = await PetService.getAllPets(page, limit);
      return res.status(200).json(pets);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro do Servidor.' });
    }
  }
}
