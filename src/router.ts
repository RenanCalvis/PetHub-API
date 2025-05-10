import { Router } from 'express';
import { PetController } from './controller/PetController';
import { UserController } from './controller/UserController';
import { AdController } from './controller/AdController';
import { upload } from './config/upload';

export const router = Router();
//Rotas p/ Pets
router.post('/pets', PetController.store);
router.get('/pets/:id', PetController.show);
router.get('/pets', PetController.index);

//Rotas p/ User
router.post('/user', UserController.store);
router.get('/user/:id', UserController.show);

// Rotas p/ Ads
//TODO: Criar rota separada p/ envio de fotos
router.post('/ads', upload.single('image'), AdController.store);
router.get('/ads', AdController.index);
router.get('/ads/:id', AdController.show);
router.put('/ads/:id', AdController.update);
router.delete('/ads/:id', AdController.destroy);
router.get('/ads/user/:userId', AdController.findByUserId);
router.get('/ads/filter', AdController.findWithFilters);
