import { Request, Response } from 'express';
import { prisma } from '../database/prisma';

export class PhotoController {
  static async upload(req: Request, res: Response) {
    try {
      const { adId } = req.body;
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: 'Nenhuma foto enviada' });
        return;
      }

      const photo = await prisma.photo.create({
        data: {
          url: file.filename,
          adId: Number(adId),
        },
      });

      res.status(201).json(photo);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao enviar foto' });
    }
  }

  static async getPhotos(req: Request, res: Response) {
    try {
      const { adId } = req.params;
      const photos = await prisma.photo.findMany({
        where: { adId: Number(adId) },
      });
      res.json(photos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar fotos' });
    }
  }
}