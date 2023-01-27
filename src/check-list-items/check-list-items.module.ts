import { Module } from '@nestjs/common';
import { CheckListItemsService } from './check-list-items.service';
import { CheckListItemsController } from './check-list-items.controller';

@Module({
  providers: [CheckListItemsService],
  controllers: [CheckListItemsController]
})
export class CheckListItemsModule {}
