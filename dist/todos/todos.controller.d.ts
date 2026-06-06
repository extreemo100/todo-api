import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    findAll(): import("./todo.entity").Todo[];
    findOne(id: string): import("./todo.entity").Todo;
    create(dto: CreateTodoDto): import("./todo.entity").Todo;
    update(id: string, dto: UpdateTodoDto): import("./todo.entity").Todo;
    remove(id: string): {
        deleted: true;
    };
}
