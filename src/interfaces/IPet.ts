export interface IPet {
  id: number;
  name: string;
  gender: string;
  size: string;
  birthDate: string;
  vaccines: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePetDTO = Omit<IPet, 'id' | 'createdAt' | 'updatedAt'>;
