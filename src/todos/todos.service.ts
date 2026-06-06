import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  // In-memory store. Swap this out for a database later.
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  create(dto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: randomUUID(),
      title: dto.title,
      description: dto.description,
      completed: dto.completed ?? false,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: string, dto: UpdateTodoDto): Todo {
    const todo = this.findOne(id); // throws if missing
    Object.assign(todo, dto);
    return todo;
  }

  remove(id: string): { deleted: true } {
    const todo = this.findOne(id); // throws if missing
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    return { deleted: true };
  }
}
