import { Router } from 'express';
import { PetController } from './controller/PetController';

export const router = Router();

router.post('/pets', PetController.createPet);
router.get('/pets/:id', PetController.getPetById);
router.get('/pets', PetController.getAllPets);
