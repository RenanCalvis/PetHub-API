export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: AddressDTO;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddressDTO {
  cep: string;
  city: string;
  street: string;
  neighborhood: string;
}

export interface IIndividualUser extends IUser {
  cpf: string;
}

export interface ICompanyUser extends IUser {
  cnpj: string;
}

export type CreateUserDTO = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateIndividualUserDTO = CreateUserDTO & {
  cpf: string;
};

export type CreateCompanyUserDTO = CreateUserDTO & {
  cnpj: string;
};
