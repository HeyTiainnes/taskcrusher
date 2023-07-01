// import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CheckListItemsEntity } from './check-list-items.entity/check-list-items.entity';
import { CheckListItemsService } from './check-list-items.service';
import { CheckListItemsDTO } from './check-list-items.entity/dto/createCheckListItems.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('checkListItems')
export class CheckListItemsController {
    constructor(private readonly checkListItemsService: CheckListItemsService) { }

    @Post()
    async createCheckListItems(@Body() create: CheckListItemsDTO) {
        create.taskId = create.taskId;
        console.log('new CLI', create);
        return await this.checkListItemsService.createCheckListItems(create);
    }

    @Patch(':id')
    UpdateCheckListItems(
        @Param('id') id: number,
        @Body() updateCheckListItemsDto: CheckListItemsDTO,
    ) {
        console.log('update', updateCheckListItemsDto, 'id', id);
        return this.checkListItemsService.update(id, updateCheckListItemsDto);
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
