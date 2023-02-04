import { TasksEntity } from "src/tasks/tasks.entity/tasks.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";



@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
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




