import { Request, Response } from 'express';
import { AdService } from '../services/AdService';
import { CustomError } from '../errors/CustomError';

export class AdController {
  static async store(req: Request, res: Response): Promise<any> {
    try {
      const ad = await AdService.createAd(req.body);
      return res.status(201).json(ad);
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
      const isActive = req.query.isActive === 'true' ? true : undefined;
      const excludeId = req.query.excludeId
        ? Number(req.query.excludeId)
        : undefined;
      const ads = await AdService.getAllAds(page, limit, isActive, excludeId);
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
