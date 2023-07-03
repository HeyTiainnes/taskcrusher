// import { TasksService } from './tasks.service';
import { CreateTasksDTO } from './Dto/createTasks.dto';
import { updateTaskeDto } from './Dto/updateTask.dto';
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@Body() createTaskDto: CreateTasksDTO) {
        return this.tasksService.create(createTaskDto);
    }

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.tasksService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateTaskDto: updateTaskeDto) {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.tasksService.remove(id);
    }
}
