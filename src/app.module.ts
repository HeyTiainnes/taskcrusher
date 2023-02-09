import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoriesController } from './categories/categories.controller';
import { CheckListItemsService } from './check-list-items/check-list-items.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UsersModule } from './users/users.module';

dotenv.config();


@Module({
  imports: [UsersModule, TasksModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: 'postgres',
        password: '!Post@29310!',
        database: 'taskscrusher',
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),



  ],
  controllers: [AppController, CategoriesController],
  providers: [AppService, CheckListItemsService],
})
export class AppModule { }
