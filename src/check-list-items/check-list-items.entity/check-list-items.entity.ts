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

    @OneToMany(() => TasksEntity, (task) => task.CheckListItemsEntity, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'taskId' })
    task: TasksEntity;

    @Column({ nullable: true })
    taskId: number;
}
