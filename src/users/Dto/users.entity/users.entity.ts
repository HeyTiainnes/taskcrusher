import { TasksEntity } from "src/tasks/tasks.entity/tasks.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";



@Entity('theyUsers')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    userId: number

    @Column()
    name: string;

    @Column()
    mail: string;

    @Column()
    password: string;

    // @Column()
    // userId : number;

    @ManyToOne(type => TasksEntity, (Tasks) => Tasks.user)
    Tasks: TasksEntity[];

}




