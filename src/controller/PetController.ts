import { Request, Response } from 'express';
import { PetService } from '../services/PetService';

// export const createPet = async (req: Request, res: Response): Promise<any> => {
//   const { name, gender, size, birthDate, vaccines, description }: Pet =
//     req.body;

//   const pet = await prisma.pet.create({
//     data: { name, gender, size, birthDate, vaccines, description },
//   });

//   return res.json(pet);
// };

export class PetController {
  static async createPet(req: Request, res: Response): Promise<any> {
    try {
      const pet = await PetService.createPet(req.body);
      return res.status(201).json(pet);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ erro: 'Erro desconhecido.' });
    }
  }
}
