import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tasks')

export class TasksEntity {

    @PrimaryGeneratedColumn('uuid')
    id_tasks: number;

    @Column()
    designation: string;

    @Column()
    importance: number;

    @Column()
    dead_line: Date;

    @Column()
    duree_prevue: Date;

    @Column()
    date_debut_prevue: Date;

    @Column()
    etat: boolean;

    @Column()
    notes: string;

}
//