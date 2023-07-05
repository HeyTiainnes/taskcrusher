// // Importation du décorateur de module et du module TypeOrmModule
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importation des composants du module
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './Dto/users.entity/users.entity';

// Définition du module 'UsersModule'
@Module({
  // Importation du module TypeOrmModule et de l'entité UsersEntity pour accéder à la base de données
  imports: [TypeOrmModule.forFeature([UsersEntity])],

  // Définition du contrôleur UsersController pour gérer les requêtes HTTP
  controllers: [UsersController],

  // Définition du service UserService pour encapsuler la logique métier de l'application liée aux utilisateurs
  providers: [UsersService],

})
export class UsersModule { }
