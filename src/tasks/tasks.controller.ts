import { CreateTasksDTO } from './Dto/createTasks.dto';
import { updateTaskeDto } from './Dto/updateTask.dto';
import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createTaskDto: CreateTasksDTO, @Req() req) {
        // Récupérer l'ID de l'utilisateur connecté depuis le JWT
        const userId = req.user.id_users;
        return this.tasksService.create({ ...createTaskDto, user: { id_users: userId } });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Req() req) {
        // Récupérer l'ID de l'utilisateur connecté depuis le JWT
        const userId = req.user.id_users;
        return this.tasksService.findAll(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number, @Req() req) {
        // Récupérer l'ID de l'utilisateur connecté depuis le JWT
        const userId = req.user.id_users;
        return this.tasksService.findOne(id, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() updateTaskDto: updateTaskeDto, @Req() req) {
        // Récupérer l'ID de l'utilisateur connecté depuis le JWT
        const userId = req.user.id_users;
        return this.tasksService.update(id, userId, updateTaskDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: number, @Req() req) {
        // Récupérer l'ID de l'utilisateur connecté depuis le JWT
        const userId = req.user.id_users;
        return this.tasksService.remove(id, userId);
    }
}
