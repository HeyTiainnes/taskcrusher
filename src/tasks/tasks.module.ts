// Importe les classes nécessaires depuis les packages '@nestjs/common' et '@nestjs/typeorm'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
// Importe les classes TasksController, TasksService et TasksEntity depuis leurs fichiers respectifs
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity/tasks.entity';

// Définit la classe TasksModule en utilisant le décorateur @Module
@Module({
  // La propriété 'imports' permet d'importer d'autres modules et de les rendre disponibles
  // ici, on importe le module TypeOrmModule en précisant que le modèle à utiliser est TasksEntity
  imports: [TypeOrmModule.forFeature([TasksEntity]), AuthModule],

  // La propriété 'controllers' indique les contrôleurs qui seront utilisés dans ce module
  // ici, on utilise le TasksController
  controllers: [TasksController],

  // La propriété 'providers' liste les services et autres fournisseurs de dépendances qui seront utilisés dans ce module
  // ici, on utilise le TasksService
  providers: [TasksService],
})
// Exporte la classe TasksModule pour qu'elle puisse être utilisée dans d'autres parties de l'application
export class TasksModule { }
