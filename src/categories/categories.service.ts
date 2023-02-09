import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCategoriesDTO } from './Dto/updateCategories.dto';
import { Repository } from 'typeorm';
import { CategoriesEntity } from './categories.entity/categories.entity';


@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoriesEntity)
        private readonly categorieRepository: Repository<CategoriesEntity>,
    ) { }

    async createCategorie(categorie: CategoriesEntity) {
        return await this.categorieRepository.save(categorie);
    }
    async findOne(id_categorie: number): Promise<CategoriesEntity> {
        const categorieFound = await this.categorieRepository.findOneBy({
            id_categorie: id_categorie,
        });
        if (!categorieFound) {
            throw new NotFoundException(
                `Désolé, nous n'avons pas trouvé de categ avec l'id ${id_categorie}`,
            );
        }
        return categorieFound;
    }
    async update(id_categorie: number, updatCategorie: UpdateCategoriesDTO) {

        const CategorieUpdate = await this.findOne(id_categorie);
        CategorieUpdate.name = updatCategorie.name;
        CategorieUpdate.couleur = updatCategorie.couleur;

        return await this.categorieRepository.save(CategorieUpdate);
    }

    async findAll(): Promise<CategoriesEntity[]> {
        return await this.categorieRepository.find();
    }

    async remove(id_categorie: number): Promise<string> {
        const Result = await this.categorieRepository.delete({ id_categorie });
        if (Result.affected === 0) {
            throw new NotFoundException(
                `Suppression impossible, car il n'y a pas de cat avec l'id ${id_categorie}`,
            );
        }
        return `Bravo: L'utilisateur avec l'id ${id_categorie} a bien été supprimée...`;
    }



}
