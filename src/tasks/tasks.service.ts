import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from './tasks.entity/tasks.entity';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksEntity)
        private readonly tasksRepository: Repository<TasksEntity>,
    ) { }

    async createTask(task: TasksEntity) {
        return await this.tasksRepository.save(task);
    }
}
