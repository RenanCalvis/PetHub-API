import { PrismaClient } from '@prisma/client';

export class GenericRepository<T> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async create(data: T) {
    return await this.model.create({ data });
  }

  async show(id: number) {
    return await this.model.findUnique({ where: { id } });
  }

  async index(skip: number = 0, limit: number = 10) {
    return await this.model.findMany({
      skip,
      take: limit,
    });
  }

  async update(id: number, data: Partial<T>) {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async destroy(id: number) {
    return await this.model.delete({ where: { id } });
  }
}
