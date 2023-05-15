import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './Dto/users.entity/users.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],

  controllers: [UsersController],
  providers: [UserService, JwtStrategy],

})
export class UsersModule { }
