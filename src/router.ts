import { Router } from 'express';
import { PetController } from './controller/PetController';
import { UserController } from './controller/UserController';
import { AdController } from './controller/AdController';
import { authenticateToken } from './helper/jwt/middewares/authenticateToken';
import { upload } from './config/multer';
import { PhotoController } from './controller/PhotoController';
export const router = Router();
//Rotas p/ Pets
router.post('/pets', PetController.store);
router.get('/pets/:id', PetController.show);
router.get('/pets', PetController.index);

//Rotas p/ User
router.post('/user', UserController.store);
router.get('/user/:id', UserController.show);
router.post('/login', UserController.login);

// Rotas p/ Ads
router.post('/ads', AdController.store);
router.get('/ads', AdController.index);
router.get('/ads/:id', AdController.show);
router.put('/ads/:id', AdController.update);
router.delete('/ads/:id', AdController.destroy);
router.get('/ads/user/:userId', AdController.findByUserId);
router.get('/ads/filter', AdController.findWithFilters);

//Rotas para Photos
router.post(
  '/ads/:id/photos',
  upload.single('photo'), // Aceita 1 arquivo com o nome "photo"
  PhotoController.upload, // Chama o controller
);

router.get('/ads/:adId/photos', PhotoController.getPhotos);