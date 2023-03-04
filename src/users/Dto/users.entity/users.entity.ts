import { TasksEntity } from "src/tasks/tasks.entity/tasks.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";



@Entity('theyUsers')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id_users: number

    @Column()
    name: string;

    @Column()
    mail: string;

    @Column()
    password: string;

    @ManyToOne(type => TasksEntity, (Tasks) => Tasks.user)
    Tasks: TasksEntity[];

}




