import { Router } from 'express';
import { PetController } from './controller/PetController';

export const router = Router();

router.post('/pet', PetController.createPet);
