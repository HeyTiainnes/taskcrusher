
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity/tasks.entity';


@Module({

  imports: [TypeOrmModule.forFeature([TasksEntity]), AuthModule],


  controllers: [TasksController],


  providers: [TasksService],
})

export class TasksModule { }
