import { prisma } from '../database/prisma';
import { GenericRepository } from './GenericRepository';

export class PhotoRepository extends GenericRepository<any> {
  constructor() {
    super(prisma.photo);
  }

  async findByAdId(adId: number) {
    return await prisma.photo.findMany({
      where: { adId },
    });
  }
}
