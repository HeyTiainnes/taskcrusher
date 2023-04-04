import { Controller, Get, Post, Delete, Put, Patch, Body, Param } from '@nestjs/common';
import { TasksEntity } from './tasks.entity/tasks.entity';
import { TasksService } from './tasks.service';
import { updateTaskeDto } from './Dto/updateTask.dto'


@Controller('Tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    async createTask(@Body() create: TasksEntity) {
        console.log('new tsk', create);
        console.log('taskService', TasksService)
        return await this.tasksService.createTask(create);
    }

    @Patch(':id')
    UpdateTask(@Param('id') id: string, @Body() updateTaskeDto: updateTaskeDto) {
        console.log('update', updateTaskeDto, 'id', +id)
        return this.tasksService.update(+id, updateTaskeDto);
    }

    // y

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








