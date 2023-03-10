import { TasksEntity } from "src/tasks/tasks.entity/tasks.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";



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

    @OneToMany(type => TasksEntity, (tasks) => tasks.user)
    tasks: TasksEntity[];

}




