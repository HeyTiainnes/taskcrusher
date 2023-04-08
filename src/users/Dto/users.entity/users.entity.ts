import { TasksEntity } from "src/tasks/tasks.entity/tasks.entity";
import { UserRoleEnum } from "src/users/enums/user.role.enum";
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

    @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
    role: string;


    // @ManyToOne(type => TasksEntity, (Tasks) => Tasks.user)
    // Tasks: TasksEntity[];
    @OneToMany(type => TasksEntity, (task) => task.user)
    tasks: TasksEntity[];

}




