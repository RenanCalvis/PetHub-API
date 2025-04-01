import { prisma } from '../../database/prisma';
import { GenericRepository } from '../GenericRepository';

export class AddressRepository extends GenericRepository<any> {
  constructor() {
    super(prisma.address);
  }
}
