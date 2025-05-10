import { Request, Response } from 'express';
import { AdService } from '../services/AdService';
import { CustomError } from '../errors/CustomError';
import { upload } from '../config/upload';

export class AdController {
  static async store(req: Request, res: Response): Promise<any> {
    try {
      // Primeiro, fazemos o upload da imagem
      upload.single('image')(req, res, async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: 'Erro ao fazer upload da imagem.' });
        }

        // Extraímos os dados de `data` do body e a imagem que foi enviada
        const { description, userId, pet } = JSON.parse(req.body.data);

        // Adicionamos o nome da imagem ao objeto pet
        const imageFilename = req.file?.filename;

        // Garantimos que o nome da imagem seja passado junto ao pet
        const petWithImage = {
          ...pet,
          image: imageFilename, // O nome do arquivo da imagem
        };

        const ad = await AdService.createAd({
          description,
          userId: Number(userId),
          pet: petWithImage, // Passamos o pet com a imagem
        });

        return res.status(201).json(ad);
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      console.log(error);
      return res.status(500).json({ message: 'Erro do Servidor.' });
    }
  }

  static async show(req: Request, res: Response): Promise<any> {
    try {
      const ad = await AdService.getAdByID(Number(req.params.id));
      return res.status(200).json(ad);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro do Servidor.' });
    }
  }

  static async index(req: Request, res: Response): Promise<any> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const ads = await AdService.getAllAds(page, limit);
      return res.status(200).json(ads);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro do Servidor.' });
    }
  }

  static async update(req: Request, res: Response): Promise<any> {
    try {
      const ad = await AdService.updateAd(Number(req.params.id), req.body);
      return res.status(200).json(ad);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro do Servidor.' });
    }
  }

  static async destroy(req: Request, res: Response): Promise<any> {
    try {
      await AdService.deleteAd(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro do Servidor.' });
    }
  }

  static async findByUserId(req: Request, res: Response): Promise<any> {
    try {
      const ads = await AdService.getAdsByUserId(Number(req.params.userId));
      return res.status(200).json(ads);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro do Servidor.' });
    }
  }

  static async findWithFilters(req: Request, res: Response): Promise<any> {
    try {
      const { gender, size } = req.query;
      const ads = await AdService.getAdsWithFilters({
        gender: gender as string,
        size: size as string,
      });
      return res.status(200).json(ads);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro do Servidor.' });
    }
  }
}
