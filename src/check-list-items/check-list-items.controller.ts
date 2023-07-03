
import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CheckListItemsEntity } from './check-list-items.entity/check-list-items.entity';
import { CheckListItemsService } from './check-list-items.service';
import { CheckListItemsDTO } from './check-list-items.entity/dto/createCheckListItems.dto';

@Controller('checkListItems')
export class CheckListItemsController {
    constructor(private readonly checkListItemsService: CheckListItemsService) { }

    @Post()
    async createCheckListItems(@Body() create: CheckListItemsDTO) {
        create.tasksId = create.tasksId;
        console.log('new CLI', create);
        return await this.checkListItemsService.createCheckListItems(create);
    }

    @Patch(':id')
    async updateCheckListItems(
        @Param('id') id: number,
        @Body() updateCheckListItemsDto: CheckListItemsDTO,
    ) {
        console.log('update', updateCheckListItemsDto, 'id', id);
        return await this.checkListItemsService.update(id, updateCheckListItemsDto);
    }
    @Get(':tasksId')
    findBytasksId(@Param('tasksId') tasksId: number) {
        return this.checkListItemsService.findBytasksId(tasksId);
    }
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.checkListItemsService.findOne(id);
    }

    @Get()
    findAll() {
        return this.checkListItemsService.findAll();
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.checkListItemsService.remove(id);
    }
}
