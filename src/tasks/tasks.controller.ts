import { Controller, Get, Post, Delete, Put, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { CreateTasksDTO } from './Dto/createTasks.dto';
import { TasksEntity } from './tasks.entity/tasks.entity';
import { TasksService } from './tasks.service';
import { updateTaskeDto } from './Dto/updateTask.dto'
import { GetUser } from 'src/auth/get-user.decorator';
import { UsersEntity } from 'src/users/Dto/users.entity/users.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('Tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(
        @Body() createTacheDto: CreateTasksDTO,
        @GetUser() utilisateur: UsersEntity,
    ): Promise<TasksEntity | string> {
        return this.tasksService.create(createTacheDto, utilisateur);
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
    @Get()
    findAllTaskByUser(@GetUser() utilisateur: UsersEntity): Promise<TasksEntity[]> {
        console.log(TasksEntity);
        return this.tasksService.findAllTaskByUser(utilisateur);
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