import { CustomError } from '../errors/CustomError';
import { AddressRepository } from '../repositories/User/AddressRepository';
import { CompanyUserRepository } from '../repositories/User/CompanyUserRepository';
import { IndividualUserRepository } from '../repositories/User/IndividualUserRepository';
import { UserRepository } from '../repositories/User/UserRepository';

export class UserService {
  static async createUser(data: any) {
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

    if (data.cpf === '') {
      throw new CustomError('É necessário informar um CPF válido.', 400);
    } else if (data.cpf) {
      const existingCpf = await individualUserRepository.findByCpf(data.cpf);
      if (existingCpf)
        throw new CustomError('CPF informado já cadastrado.', 400);
    }
    if (data.cnpj === '') {
      throw new CustomError('É necessário informar um CNPJ válido.', 400);
    } else if (data.cnpj) {
      const existingCnpj = await companyUserRepository.findByCnpj(data.cnpj);
      if (existingCnpj)
        throw new CustomError('CNPJ informado já cadastrado.', 400);
    }

    // Verifica se está criando um usuário individual ou empresa
    if (data.cpf && !data.cnpj) {
      // Se é um usuário individual e o CPF não foi informado
      if (!data.cpf || data.cpf === '') {
        throw new CustomError('É necessário informar um CPF válido.', 400);
      }
    } else if (data.cnpj && !data.cpf) {
      // Se é um usuário Ong e o CNPJ não foi informado
      if (!data.cnpj || data.cnpj === '') {
        throw new CustomError('É necessário informar um CNPJ válido.', 400);
      }
    }

    const newUser = await userRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    });

    if (data.cpf) {
      await individualUserRepository.create({
        userId: newUser.id,
        cpf: data.cpf,
      });
    } else if (data.cnpj) {
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
}
