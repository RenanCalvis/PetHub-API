import { prisma } from '../../database/prisma';
import { GenericRepository } from '../GenericRepository';

export class IndividualUserRepository extends GenericRepository<any> {
  constructor() {
    super(prisma.individualUser);
  }

  async findByCpf(cpf: string) {
    return await prisma.individualUser.findUnique({
      where: { cpf },
    });
  }
}
