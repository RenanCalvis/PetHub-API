import { PetRepository } from '../repositories/PetRepository';

export class PetService {
  static async createPet(data: any) {
    const existingPet = await new PetRepository().findExistingPet(data);
    if (existingPet) {
      if (existingPet) {
        throw new Error('Ops... Já existe um Animalzinho com esses dados.');
      }
    }
    return await new PetRepository().create(data);
  }

  static async getPetByID(id: number) {
    return await new PetRepository().findById(id);
  }

  static async getAllPets() {
    return await new PetRepository().findAll();
  }

  static async updatePet(id: number, data: any) {
    return await new PetRepository().update(id, data);
  }

  static async deletePet(id: number) {
    return await new PetRepository().delete(id);
  }
}
