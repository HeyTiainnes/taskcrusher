// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TasksEntity } from 'src/tasks/tasks.entity/tasks.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('checkListItems')
export class CheckListItemsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    notes?: string;

    @ManyToOne(type => TasksEntity, (tasks) => tasks.checkListItems)
    //checkListItems: checkListItemsEntity[];
    Tasks: TasksEntity[];

    @JoinColumn({ name: 'tasksId' })
    task: TasksEntity;

    @Column({ nullable: true })
    tasksId: number;
}
