// import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckListItemsEntity } from './check-list-items.entity/check-list-items.entity';
import { CheckListItemsDTO } from './check-list-items.entity/dto/createCheckListItems.dto';
import { FindOneOptions } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CheckListItemsService {
    constructor(
        @InjectRepository(CheckListItemsEntity)
        private readonly checkListItemsRepository: Repository<CheckListItemsEntity>,
    ) { }

    async createCheckListItems(checkListItems: CheckListItemsDTO) {
        const { taskId, ...rest } = checkListItems;
        const checkListItemsEntity = new CheckListItemsEntity();
        checkListItemsEntity.name = rest.name;
        checkListItemsEntity.notes = rest.notes;
        checkListItemsEntity.taskId = taskId;
        return await this.checkListItemsRepository.save(checkListItemsEntity);
    }

    async findOne(id: number): Promise<CheckListItemsEntity> {
        const options: FindOneOptions<CheckListItemsEntity> = {
            where: { id },
        };
        const checkListItemsFound = await this.checkListItemsRepository.findOne(
            options,
        );
        if (!checkListItemsFound) {
            throw new NotFoundException(
                `Désolé, nous n'avons pas trouvé de check-List avec l'id ${id}`,
            );
        }
        return checkListItemsFound;
    }

    async update(id: number, updateCheckListItemsDTO: CheckListItemsDTO) {
        const checkListItemsUpdate = await this.findOne(id);
        checkListItemsUpdate.name = updateCheckListItemsDTO.name;
        checkListItemsUpdate.notes = updateCheckListItemsDTO.notes;
        return await this.checkListItemsRepository.save(checkListItemsUpdate);
    }

    async findAll(): Promise<CheckListItemsEntity[]> {
        return await this.checkListItemsRepository.find();
    }

    async remove(id: number): Promise<string> {
        const result = await this.checkListItemsRepository.delete({ id });
        if (result.affected === 0) {
            throw new NotFoundException(
                `Suppression impossible, car il n'y a pas de cli avec l'id ${id}`,
            );
        }
        return `Bravo: La cli l'id ${id} a bien été supprimée...`;
    }
}
