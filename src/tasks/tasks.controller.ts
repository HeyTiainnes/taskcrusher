// on importe aussi la methode get

import { Controller, Get } from '@nestjs/common';


// le 'tasks' permet d'indiquer le chemin d'ecoute /tasks
@Controller('tasks')
export class TasksController {}
