import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.todo.findMany();
  }

  async findOne(id: string) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  create(dto: CreateTodoDto) {
    return this.prisma.todo.create({ data: dto });
  }

  async update(id: string, dto: UpdateTodoDto) {
    await this.findOne(id); // throws 404 if missing
    return this.prisma.todo.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id); // throws 404 if missing
    await this.prisma.todo.delete({ where: { id } });
    return { deleted: true };
  }
}