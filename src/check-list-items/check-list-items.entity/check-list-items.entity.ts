import { TasksEntity } from "src/tasks/tasks.entity/tasks.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('checkListItems')

export class checkListItemsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    items: string;

    @Column()
    notes: string;


    @ManyToOne(type => TasksEntity, (tasks) => tasks.checkListItems)
    //checkListItems: checkListItemsEntity[];
    Tasks: TasksEntity[];

}


//

