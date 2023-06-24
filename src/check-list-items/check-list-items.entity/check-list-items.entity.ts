import { TasksEntity } from "src/tasks/tasks.entity/tasks.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('checkListItems')

export class checkListItemsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    name?: string;

    // @Column()
    // items: string;

    @Column({ nullable: true })
    notes?: string;



    @OneToOne(() => TasksEntity)
    @JoinColumn()
    task: TasksEntity;

}
