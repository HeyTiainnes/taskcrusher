import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { CategoriesEntity } from './categories.entity/categories.entity';
import { CategoriesService } from './categories.service';
import { UpdateCategoriesDTO } from '../categories/categories.entity/dto/updateCategories.dto'

@Controller('Categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) { }
    @Post()
    async createCategorie(@Body() create: CategoriesEntity) {
        console.log('new categorie', create);
        return await this.categoriesService.createCategorie(create);
    }
    @Patch(':id_categorie')
    UpdateCategorie(@Param('id_categorie') id_categorie: number, @Body() updatecategorieDto: UpdateCategoriesDTO) {
        console.log('update', updatecategorieDto, 'id', +id_categorie)
        return this.categoriesService.update(+id_categorie, updatecategorieDto);
    }


    @Get(':id_categorie')
    findOne(@Param('id_categorie') id_categorie: number) {
        return this.categoriesService.findOne(+id_categorie);
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Delete(':id')
    remove(@Param('id') id_categorie: number) {
        return this.categoriesService.remove(+id_categorie);
    }





}
