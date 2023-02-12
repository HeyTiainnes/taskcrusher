import { Module } from '@nestjs/common';
import { CheckListItemsService } from './check-list-items.service';
import { CheckListItemsController } from './check-list-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { checkListItemsEntity } from './check-list-items.entity/check-list-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([checkListItemsEntity])],
  providers: [CheckListItemsService],
  controllers: [CheckListItemsController],
})
export class CheckListItemsModule { }
