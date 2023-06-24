import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from './tasks.entity/tasks.entity';
import { updateTaskeDto } from './Dto/updateTask.dto';
import { CreateTasksDTO } from './Dto/createTasks.dto';
import { UsersEntity } from 'src/users/Dto/users.entity/users.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksEntity)
        private readonly tasksRepository: Repository<TasksEntity>,
    ) { }

    // async createTask(
    //     createTaskDto: CreateTasksDTO,
    //     connectedUser: UsersEntity

    // ): Promise<TasksEntity> {
    //     const TaskCreation = {
    //         ...createTaskDto,
    //         user: connectedUser
    //     };
    //     return await this.tasksRepository.save(TaskCreation);
    // }

    /////////////////////CREATE/////////////////////////////////////

    async create(
        createTacheDto: CreateTasksDTO,
        utilisateur: UsersEntity,
    ): Promise<TasksEntity | string> {
        const { designation } = createTacheDto;
        const query = this.tasksRepository.createQueryBuilder();
        query.where({ designation }).andWhere({ user: utilisateur });
        const existAlready = await query.getOne();

        if (existAlready !== null) {
            return `Vous avez déja crée la Tâche avec le titre:${designation} ${utilisateur}`;
        }

        const newTache = await this.tasksRepository.create({
            ...createTacheDto,
            user: utilisateur,
        });
        try {
            if (createTacheDto.designation) { createTacheDto.designation = newTache.designation }

            // if (createTacheDto.date_event) { createTacheDto.date_event = newTache.date_event }
            // console.log(' create tache dto date', createTacheDto.date_event)
            // if (createTacheDto.body) { createTacheDto.body = newTache.body }
            // if (createTacheDto.image) { createTacheDto.image = newTache.image }
            // if (createTacheDto.url) { createTacheDto.url = newTache.url }
            // if (createTacheDto.categorie_) {
            //     createTacheDto.categorie_ = newTache.categorie_
            // }


            return await this.tasksRepository.save(newTache);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    /////////////////////CREATE/////////////////////////////////
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

    async findAllTaskByUser(utilisateur: UsersEntity): Promise<TasksEntity[]> {
        const taskFound = await this.tasksRepository.findBy({
            user: utilisateur,
        });
        if (!taskFound) {
            throw new NotFoundException(`Tâche non trouvée`);
        }
        console.log(taskFound);
        return taskFound;
    }

    async update(id: number, updatTaskeDto: updateTaskeDto) {
        // 1/ recuperer la task a modifier dans la constante suivante. on parcours les task via find pour trouver task ac l'id recherché
        const taskUpdate = await this.findOne(id);
        taskUpdate.designation = updatTaskeDto.designation;
        taskUpdate.importance = updatTaskeDto.importance;
        taskUpdate.dead_line = updatTaskeDto.dead_line;
        taskUpdate.duree_prevue = updatTaskeDto.duree_prevue;
        //taskUpdate.date_debut_prevue = updatTaskeDto.date_debut_prevue;
        taskUpdate.etat = updatTaskeDto.etat;
        taskUpdate.notes = updatTaskeDto.notes;
        return await this.tasksRepository.save(taskUpdate);
    }
    // async findOne(id: number): Promise<TasksEntity> {
    //     const taskfound = await this.tasksRepository.findOneBy({
    //         id: id,
    //     });

    //     return await taskfound;
    // }

    async findAll(): Promise<TasksEntity[]> {
        return await this.tasksRepository.find();
    }

    async remove(id: number): Promise<string> {
        const Result = await this.tasksRepository.delete({ id });
        if (Result.affected === 0) {
            throw new NotFoundException(
                `Suppression impossible, car il n'y a pas de tasl avec l'id ${id}`,
            );
        }
        return `Bravo: L'utilisateur avec l'id ${id} a bien été supprimée...`;
    }

}
