import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { CreateTasksDTO } from './tasks.entity/Dto/createTasks.dto';

@Controller('tasks')
export class TasksController {

    @Get()
    getHello(): string {
        console.log('recuperer la liste des todo');
        return 'liste todo';
    }
    @Post()
    createTask(@Body() newTask: CreateTasksDTO) {
        console.log('ajout  todo');
        return 'add todo';
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








