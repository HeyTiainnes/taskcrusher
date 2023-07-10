
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from './tasks.entity/tasks.entity';
import { CreateTasksDTO } from './Dto/createTasks.dto';
import { updateTaskeDto } from './Dto/updateTask.dto';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksEntity)
        private tasksRepository: Repository<TasksEntity>,
    ) { }

    async create(createTaskDto: CreateTasksDTO): Promise<TasksEntity> {
        const task = this.tasksRepository.create(createTaskDto);
        return this.tasksRepository.save(task);
    }

    async findAll(userId: number): Promise<TasksEntity[]> {
        return this.tasksRepository.find({
            relations: ['checkListItems'],
            where: { user: { id_users: userId } },
        });
    }
    //
    async findOne(id: number, userId: number): Promise<TasksEntity> {
        return this.tasksRepository
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.checkListItems', 'checkListItems')
            .where('task.id = :id', { id })
            .andWhere('task.user.id_users = :userId', { userId })
            .getOne();
    }

    async update(id: number, userId: number, updateTaskDto: updateTaskeDto): Promise<TasksEntity> {
        const task = await this.findOne(id, userId);
        if (!task) {

        }

        task.checkListItems = updateTaskDto.checkListItems;

        return this.tasksRepository.save(task);
    }

    async remove(id: number, userId: number): Promise<void> {
        await this.tasksRepository.delete({ id, user: { id_users: userId } });
    }
}
