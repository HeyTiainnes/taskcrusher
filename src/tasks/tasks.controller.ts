import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { CreateTasksDTO } from './tasks.entity/Dto/createTasks.dto';
import { TasksEntity } from './tasks.entity/tasks.entity';
import { TasksService } from './tasks.service';



@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }
    @Get()
    getHello(): string {
        console.log('recuperer la liste des todo');
        return 'liste todo';
    }
    @Post()
    async createTask(@Body() task: TasksEntity) {
        console.log('new tsk', task);
        return await this.tasksService.createTask(task);
    }

    @Put()
    PutTodo(): string {
        console.log('modif todo');
        return 'modif todo';
    }
    @Delete()
    deleteTodo(): string {
        console.log('suppr todo');
        return 'suppr todo';
    }
}








