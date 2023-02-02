import { Controller, Get, Post, Delete, Put } from '@nestjs/common';

@Controller('tasks')
export class TasksController {

    @Get()
    getHello(): string {
        console.log('recuperer la liste des todo');
        return 'liste todo';
    }
    @Post()
    addTodo(): string {
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








