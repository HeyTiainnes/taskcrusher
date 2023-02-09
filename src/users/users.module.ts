import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './Dto/users.entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],

  controllers: [UsersController],
  providers: [UserService],

})
export class UsersModule { }
