// on importe aussi la methode get

import { Controller, Get, Put } from '@nestjs/common';
import { Delete, Post } from '@nestjs/common/decorators';


// le 'tasks' permet d'indiquer le chemin d'ecoute /tasks, l'uri 
@Controller('tasks')
export class TasksController {

    @Get()
    getTasks() {
        console.log('recuperer liste des tasks');
        return 'TASKING LIST';

    }

    @Post()
    addTasks() {
        console.log('ajouter une task a la liste');
        return 'TASKING ADDED';

    }
    @Delete()

    DeleteTasks() {
        console.log('Delete one task');
        return 'TASKING Deleted';

    }

    @Put()
    modifyTasks() {
        console.log('Modify one task');
        return 'TASKING MODIFY';

    }

}
