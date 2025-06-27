import { Request, Response } from 'express';
import { PhotoService } from '../services/PhotoService';
import { CustomError } from '../errors/CustomError';

export class PhotoController {
  static async upload(req: Request, res: Response) {
    try {
      const { id: adId } = req.params;
      const file = req.file;

      const photo = await PhotoService.uploadPhoto(Number(adId), file?.filename ?? '');
      res.status(201).json(photo);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro ao enviar foto' });
      }
    }
  }

  static async getPhotos(req: Request, res: Response) {
    try {
      const { adId } = req.params;
      const photos = await PhotoService.getPhotosByAdId(Number(adId));
      res.json(photos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar fotos' });
    }
  }
}
