import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from './tasks.entity/tasks.entity';
import { updateTaskeDto } from './tasks.entity/Dto/updateTask.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksEntity)
        private readonly tasksRepository: Repository<TasksEntity>,
    ) { }

    async createTask(task: TasksEntity) {
        return await this.tasksRepository.save(task);
    }
    async findOne(id: number): Promise<TasksEntity> {
        const taskFound = await this.tasksRepository.findOneBy({
            id: id,
        });
        if (!taskFound) {
            throw new NotFoundException(
                `Désolé, nous n'avons pas trouvé de task avec l'id ${id}`,
            );
        }
        return taskFound;
    }
    async update(id: number, updatTaskeDto: updateTaskeDto) {
        // 1/ recuperer la task a modifier dans la constante suivante. on parcours les task via find pour trouver task ac l'id recherché
        const taskUpdate = await this.findOne(id);
        taskUpdate.designation = updatTaskeDto.designation;
        taskUpdate.importance = updatTaskeDto.importance;
        taskUpdate.dead_line = updatTaskeDto.dead_line;
        taskUpdate.duree_prevue = updatTaskeDto.duree_prevue;
        taskUpdate.date_debut_prevue = updatTaskeDto.date_debut_prevue;
        taskUpdate.etat = updatTaskeDto.etat;
        taskUpdate.notes = updatTaskeDto.notes;
        return await this.tasksRepository.save(taskUpdate);
    }
}
