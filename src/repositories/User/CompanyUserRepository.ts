import { prisma } from '../../database/prisma';
import { GenericRepository } from '../GenericRepository';

export class CompanyUserRepository extends GenericRepository<any> {
  constructor() {
    super(prisma.companyUser);
  }

  async findByCnpj(cnpj: string) {
    return await prisma.companyUser.findUnique({
      where: { cnpj },
    });
  }
}
