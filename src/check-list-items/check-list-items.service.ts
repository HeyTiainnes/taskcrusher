import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkListItemsEntity } from './check-list-items.entity/check-list-items.entity';
import { CheckListItemsDTO } from './check-list-items.entity/dto/createCheckListItems.dto';

@Injectable()
export class CheckListItemsService {
    constructor(
        @InjectRepository(checkListItemsEntity)
        private readonly checkListItemsRepository: Repository<checkListItemsEntity>,
    ) { }

    async createCheckListItems(checkListItems: checkListItemsEntity) {
        return await this.checkListItemsRepository.save(checkListItems);
    }
    async findOne(id: number): Promise<checkListItemsEntity> {
        const checkListItemsFound = await this.checkListItemsRepository.findOneBy({
            id: id,
        });
        if (!checkListItemsFound) {
            throw new NotFoundException(
                `Désolé, nous n'avons pas trouvé de check-List avec l'id ${id}`,
            );
        }
        return checkListItemsFound;
    }
    async update(id: number, updatCheckListItemsDTO: CheckListItemsDTO) {

        const CheckListItemsUpdate = await this.findOne(id);
        CheckListItemsUpdate.name = updatCheckListItemsDTO.name;
        // CheckListItemsUpdate.items = updatCheckListItemsDTO.items;
        CheckListItemsUpdate.notes = updatCheckListItemsDTO.notes;

        return await this.checkListItemsRepository.save(CheckListItemsUpdate);
    }

    async findAll(): Promise<checkListItemsEntity[]> {
        return await this.checkListItemsRepository.find();
    }

    async remove(id: number): Promise<string> {
        const Result = await this.checkListItemsRepository.delete({ id });
        if (Result.affected === 0) {
            throw new NotFoundException(
                `Suppression impossible, car il n'y a pas de cli avec l'id ${id}`,
            );
        }
        return `Bravo: La cli l'id ${id} a bien été supprimée...`;
    }



}
