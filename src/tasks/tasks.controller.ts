import { Controller, Get, Post, Delete, Put, Patch, Body, Param } from '@nestjs/common';
import { CreateTasksDTO } from './tasks.entity/Dto/createTasks.dto';
import { TasksEntity } from './tasks.entity/tasks.entity';
import { TasksService } from './tasks.service';
import { updateTaskeDto } from './tasks.entity/Dto/updateTask.dto'


@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }
    // @Get()
    // getHello(): string {
    //     console.log('recuperer la liste des todo');
    //     return 'liste todo';
    // }
    @Post()
    async createTask(@Body() create: TasksEntity) {
        console.log('new tsk', create);
        return await this.tasksService.createTask(create);
    }

    @Patch(':id')
    UpdateTask(@Param('id') id: string, @Body() updateTaskeDto: updateTaskeDto) {
        console.log('update', updateTaskeDto, 'id', +id)
        return this.tasksService.update(+id, updateTaskeDto);
    }


    @Delete()
    deleteTodo(): string {
        console.log('suppr todo');
        return 'suppr todo';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tasksService.findOne(+id);
    }

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tasksService.remove(+id);
    }
}








