import bcrypt from 'bcrypt';
import { CustomError } from '../errors/CustomError';
import {
  CreateCompanyUserDTO,
  CreateIndividualUserDTO,
} from '../interfaces/IUser';
import { AddressRepository } from '../repositories/User/AddressRepository';
import { CompanyUserRepository } from '../repositories/User/CompanyUserRepository';
import { IndividualUserRepository } from '../repositories/User/IndividualUserRepository';
import { UserRepository } from '../repositories/User/UserRepository';
import { generateKey } from 'crypto';
import { generateToken } from '../helper/jwt/generateToken';

function isIndividualUser(
  data: CreateIndividualUserDTO | CreateCompanyUserDTO,
): data is CreateIndividualUserDTO {
  return (data as CreateIndividualUserDTO).cpf !== undefined;
}

function isCompanyUser(
  data: CreateIndividualUserDTO | CreateCompanyUserDTO,
): data is CreateCompanyUserDTO {
  return (data as CreateCompanyUserDTO).cnpj !== undefined;
}

export class UserService {
  static async createUser(
    data: CreateIndividualUserDTO | CreateCompanyUserDTO,
  ) {
    const userRepository = new UserRepository();
    const individualUserRepository = new IndividualUserRepository();
    const companyUserRepository = new CompanyUserRepository();
    const addressRepository = new AddressRepository();

    const existingEmail = await userRepository.findByEmail(data.email);
    if (existingEmail)
      throw new CustomError(
        'Um usuário já foi cadastrado com esse e-mail.',
        400,
      );

    if (isIndividualUser(data)) {
      if (!data.cpf || data.cpf.trim() === '') {
        throw new CustomError('É necessário informar um CPF válido.', 400);
      }

      const existingCpf = await individualUserRepository.findByCpf(data.cpf);
      if (existingCpf)
        throw new CustomError('CPF informado já cadastrado.', 400);
    } else if (isCompanyUser(data)) {
      if (!data.cnpj || data.cnpj.trim() === '') {
        throw new CustomError('É necessário informar um CNPJ válido.', 400);
      }

      const existingCnpj = await companyUserRepository.findByCnpj(data.cnpj);
      if (existingCnpj)
        throw new CustomError('CNPJ informado já cadastrado.', 400);
    } else {
      throw new CustomError(
        'É necessário informar um CPF ou CNPJ para o cadastro.',
        400,
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
    });

    if (isIndividualUser(data)) {
      await individualUserRepository.create({
        userId: newUser.id,
        cpf: data.cpf,
      });
    } else if (isCompanyUser(data)) {
      await companyUserRepository.create({
        userId: newUser.id,
        cnpj: data.cnpj,
      });
    }

    if (data.address) {
      await addressRepository.create({
        userId: newUser.id,
        ...data.address,
      });
    }
    const completeUser = await userRepository.findUserWithDetails(newUser.id);

    return completeUser;
  }
  static async getUserByID(id: number) {
    const user = await new UserRepository().findUserWithDetails(id);
    if (!user) {
      throw new CustomError('Usuário não encontrado.', 404);
    }
    return user;
  }

  static async login(email: string, password: string) {
    const user = await new UserRepository().findByEmail(email);
    if (!user) {
      throw new CustomError('Email não encontrado.', 404);
    }
    // const passwordMatch = await bcrypt.compare(password, user.password);
    const storedPassword = user.password;

    // Verifica se é hash (bcrypt hashes começam com $2a$, $2b$, etc)
    const isHashed =
      storedPassword.startsWith('$2a$') ||
      storedPassword.startsWith('$2b$') ||
      storedPassword.startsWith('$2y$');

    let passwordMatch = false;
    if (isHashed) {
      passwordMatch = await bcrypt.compare(password, storedPassword);
    } else {
      // Senha armazenada em texto puro — compara direto
      passwordMatch = password === storedPassword;
    }
    if (!passwordMatch) {
      throw new CustomError('Senha incorreta.', 401);
    }
    const token = generateToken({ userId: user.id, email: user.email });
    return { user, token };
  }
}
