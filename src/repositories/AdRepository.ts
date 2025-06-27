import { prisma } from '../database/prisma';
import { GenericRepository } from './GenericRepository';

interface FilterOptions {
  gender?: string;
  size?: string;
}

export class AdRepository extends GenericRepository<any> {
  constructor() {
    super(prisma.ad);
  }

  async index(
    skip: number = 0,
    limit: number = 10,
    isActive?: boolean,
    excludeId?: number,
  ) {
    const whereClause: any = {};

    if (isActive !== undefined) whereClause.isActive = isActive;
    if (excludeId !== undefined) whereClause.id = { not: excludeId };

    return await prisma.ad.findMany({
      where: whereClause,
      skip,
      take: limit,
      include: {
        pet: true,
        photos:true
      },
    });
  }

  async show(adId: number) {
    return await prisma.ad.findUnique({
      where: { id: adId },
      include: {
        pet: true,
        user: true,
        photos:true
      },
    });
  }

  async update(adId: number, data: any) {
    // Primeiro obtenha o anúncio atual para pegar o petId
    const currentAd = await prisma.ad.findUnique({
      where: { id: adId },
      select: { petId: true },
    });

    if (!currentAd) {
      throw new Error('Anúncio não encontrado');
    }

    // Atualize o pet separadamente se existirem dados do pet
    if (data.pet) {
      await prisma.pet.update({
        where: { id: currentAd.petId },
        data: {
          name: data.pet.name,
          gender: data.pet.gender,
          size: data.pet.size,
          birthDate: data.pet.birthDate,
          vaccines: data.pet.vaccines,
        },
      });
    }

    // Depois atualize o anúncio
    return await prisma.ad.update({
      where: { id: adId },
      data: {
        description: data.description,
        isActive: data.isActive,
        userId: data.userId,
      },
      include: {
        pet: true,
        user: true,
      },
    });
  }

  async findByUserId(userId: number) {
    return await prisma.ad.findMany({
      where: { userId },
      include: {
        pet: true,
        user: true,
        photos:true,
      },
    });
  }

  async findByPetId(petId: number) {
    return await prisma.ad.findMany({
      where: { petId },
      include: {
        pet: true,
        user: true,
      },
    });
  }

  async findWithFilters(filters: FilterOptions) {
    return await prisma.ad.findMany({
      where: {
        pet: {
          gender: filters.gender,
          size: filters.size,
        },
      },
      include: {
        pet: true,
        user: true,
      },
    });
  }
}
