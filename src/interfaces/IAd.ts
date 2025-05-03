import { IPet } from './IPet';
import { CreateUserDTO } from './IUser';

export interface IAd {
  id: number;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  pet: CreatePetDTO;
  user: CreateUserDTO;
}

export type CreatePetDTO = Omit<IPet, 'id' | 'createdAt' | 'updatedAt'>;
