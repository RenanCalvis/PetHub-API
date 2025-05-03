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

  async index(skip: number = 0, limit: number = 10) {
    return await prisma.ad.findMany({
      skip,
      take: limit,
      include:{
        pet: true
      },
    });
  }

  async show(adId: number) {
    return await prisma.ad.findUnique({
      where: { id: adId },
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
