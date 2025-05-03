import { CustomError } from '../errors/CustomError';
import { CreatePetDTO } from '../interfaces/IPet';
import { AdRepository } from '../repositories/AdRepository';
import { PetRepository } from '../repositories/PetRepository';
import { UserRepository } from '../repositories/User/UserRepository';

export class AdService {
  static async createAd(data: {
    description: string;
    userId: number;
    pet: CreatePetDTO;
  }) {
    const adRepository = new AdRepository();
    const petRepository = new PetRepository();
    const userRepository = new UserRepository();

    const userExists = await userRepository.show(data.userId);
    if (!userExists) {
      throw new CustomError('Usuário não encontrado.', 404);
    }

    // Verifica se já existe um pet com as mesmas características
    const existingPet = await petRepository.findExistingPet(data.pet);
    if (existingPet) {
      // Verifica se já há um anúncio ativo para este pet
      const existingAds = await adRepository.findByPetId(existingPet.id);
      const alreadyActive = existingAds.some((ad) => ad.isActive);

      if (alreadyActive) {
        throw new CustomError('Já existe um anúncio ativo para este pet.', 400);
      }

      // Se o pet existe, mas sem anúncio ativo, cria o ad
      return await adRepository.create({
        description: data.description,
        userId: data.userId,
        isActive: true,
        petId: existingPet.id,
      });
    }

    // Se o pet ainda não existe, cria ele
    const newPet = await petRepository.create(data.pet);

    // Cria o anúncio com o pet recém-criado
    return await adRepository.create({
      description: data.description,
      userId: data.userId,
      isActive: true,
      petId: newPet.id,
    });
  }

  static async getAdByID(id: number) {
    const ad = await new AdRepository().show(id);
    if (!ad) {
      throw new CustomError('Anúncio não encontrado.', 404);
    }
    return ad;
  }

  static async getAllAds(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return await new AdRepository().index(skip, limit);
  }

  static async updateAd(id: number, data: any) {
    return await new AdRepository().update(id, data);
  }

  static async deleteAd(id: number) {
    return await new AdRepository().destroy(id);
  }

  static async getAdsByUserId(userId: number) {
    return await new AdRepository().findByUserId(userId);
  }

  static async getAdsWithFilters(filters: { gender?: string; size?: string }) {
    return await new AdRepository().findWithFilters(filters);
  }
}
