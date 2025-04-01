import { prisma } from '../../database/prisma';
import { GenericRepository } from '../GenericRepository';

export class UserRepository extends GenericRepository<any> {
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserWithDetails(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        individualUser: true,
        companyUser: true,
        address: true,
      },
    });
  }
}
