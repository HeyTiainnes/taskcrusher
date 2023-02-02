import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



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

    //}

}




