
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UsersEntity } from './Dto/users.entity/users.entity';


@Module({
 
  imports: [TypeOrmModule.forFeature([UsersEntity])],

 
  controllers: [UsersController],

  
  providers: [UserService],

})
export class UsersModule { }
