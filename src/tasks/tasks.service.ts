// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TasksEntity } from './tasks.entity/tasks.entity';
// import { CreateTasksDTO } from './Dto/createTasks.dto';
// import { updateTaskeDto } from './Dto/updateTask.dto';
// import { UsersEntity } from 'src/users/Dto/users.entity/users.entity'; // Importez l'entité UsersEntity
// @Injectable()
// export class TasksService {
//     constructor(
//         @InjectRepository(TasksEntity)
//         private tasksRepository: Repository<TasksEntity>,
//     ) { }

//     async create(createTaskDto: CreateTasksDTO): Promise<TasksEntity> {
//         const task = this.tasksRepository.create(createTaskDto);
//         return this.tasksRepository.save(task);
//     }

//     async findAll(): Promise<TasksEntity[]> {
//         return this.tasksRepository.find({ relations: ['checkListItems'] });
//     }

//     async findOne(id: number): Promise<TasksEntity> {
//         return this.tasksRepository
//             .createQueryBuilder('task')
//             .leftJoinAndSelect('task.checkListItems', 'checkListItems')
//             .where('task.id = :id', { id })
//             .getOne();
//     }

//     async update(id: number, updateTaskDto: updateTaskeDto): Promise<TasksEntity> {
//         const task = await this.findOne(id);
//         if (!task) {
//             // Gérer l'erreur appropriée ici (tâche non trouvée)
//         }

//         task.checkListItems = updateTaskDto.checkListItems;

//         return this.tasksRepository.save(task);
//     }

//     async remove(id: number): Promise<void> {
//         await this.tasksRepository.delete(id);
//     }
// }
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from './tasks.entity/tasks.entity';
import { CreateTasksDTO } from './Dto/createTasks.dto';
import { updateTaskeDto } from './Dto/updateTask.dto';
import { UsersEntity } from 'src/users/Dto/users.entity/users.entity'; // Importez l'entité UsersEntity

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
            // Gérer l'erreur appropriée ici (tâche non trouvée)
        }

        task.checkListItems = updateTaskDto.checkListItems;

        return this.tasksRepository.save(task);
    }

    async remove(id: number, userId: number): Promise<void> {
        await this.tasksRepository.delete({ id, user: { id_users: userId } });
    }
}
