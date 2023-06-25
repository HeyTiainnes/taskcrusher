import { TasksEntity } from "src/tasks/tasks.entity/tasks.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => TasksEntity, (task) => task.CheckListItemsEntity, {
        onDelete: 'CASCADE',
    })
    task: TasksEntity;
}


// @OneToOne(() => TasksEntity)
// @JoinColumn()
// task: TasksEntity;

// }
