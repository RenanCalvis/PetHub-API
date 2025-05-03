import { prisma } from '../database/prisma';
import { CreatePetDTO } from '../interfaces/IPet';
import { GenericRepository } from './GenericRepository';

export class PetRepository extends GenericRepository<any> {
  constructor() {
    super(prisma.pet);
  }

  async findByName(name: string) {
    return await prisma.pet.findMany({
      where: { name },
    });
  }

  async findExistingPet(data: CreatePetDTO) {
    return await prisma.pet.findFirst({
      where: {
        name: data.name,
        gender: data.gender,
        birthDate: data.birthDate,
      },
    });
  }
}
