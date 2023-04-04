import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckListItemsService } from './check-list-items/check-list-items.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';

import { CategoriesService } from './categories/categories.service';
import { CheckListItemsModule } from './check-list-items/check-list-items.module';
import { AuthModule } from './auth/auth.module';

dotenv.config();

@Module({
  imports: [UsersModule, TasksModule, CategoriesModule, CheckListItemsModule,
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
    AuthModule,



  ],

  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }