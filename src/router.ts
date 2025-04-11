import { Router } from 'express';
import { PetController } from './controller/PetController';
import { UserController } from './controller/UserController';

export const router = Router();
//Rotas p/ Pets
router.post('/pets', PetController.createPet);
router.get('/pets/:id', PetController.getPetById);
router.get('/pets', PetController.getAllPets);

//Rotas p/ User
router.post('/user', UserController.createUser);
router.get('/user/:id', UserController.getUserByID);
