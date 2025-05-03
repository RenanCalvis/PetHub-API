import { CustomError } from '../errors/CustomError';
import { PetRepository } from '../repositories/PetRepository';

export class PetService {
  static async createPet(data: any) {
    const existingPet = await new PetRepository().findExistingPet(data);
    if (existingPet) {
      throw new CustomError(
        'Ops... Já existe um Animalzinho com esses dados.',
        400,
      );
    }
    return await new PetRepository().create(data);
  }

  static async getPetByID(id: number) {
    const pet = await new PetRepository().show(id);
    if (!pet) {
      throw new CustomError('Pet não encontrado.', 404);
    }
    return pet;
  }

  static async getAllPets(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return await new PetRepository().index(skip, limit);
  }

  static async updatePet(id: number, data: any) {
    return await new PetRepository().update(id, data);
  }

  static async deletePet(id: number) {
    return await new PetRepository().destroy(id);
  }
}
