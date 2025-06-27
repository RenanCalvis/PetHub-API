import { PhotoRepository } from '../repositories/PhotoRepository';
import { CustomError } from '../errors/CustomError';

export class PhotoService {
  static async uploadPhoto(adId: number, filename: string) {
    if (!filename) {
      throw new CustomError('Nenhuma foto enviada', 400);
    }

    return await new PhotoRepository().create({
      url: filename,
      adId,
    });
  }

  static async getPhotosByAdId(adId: number) {
    const photos = await new PhotoRepository().findByAdId(adId);
    return photos;
  }
}
