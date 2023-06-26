
import { CategoriesEntity } from "src/categories/categories.entity/categories.entity";
import { checkListItemsEntity } from "src/check-list-items/check-list-items.entity/check-list-items.entity";
import { UsersEntity } from "src/users/Dto/users.entity/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Tasks')
export class TasksEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({ nullable: true })
    designation?: string;
    @Column({ nullable: true })
    importance?: number;
    @Column({ nullable: true })
    dead_line?: Date;
    @Column({ nullable: true })
    duree_prevue?: Date;
    @Column({ nullable: true })
    start_date?: Date;
    @Column({ nullable: true })
    etat?: boolean;
    @Column({ nullable: true })
    notes?: string;
    @ManyToOne(() => checkListItemsEntity, (cli) => cli.task, {
        onDelete: 'CASCADE',
        eager: true,
    })
    CheckListItemsEntity: checkListItemsEntity[];
    @ManyToOne(type => UsersEntity, (users) => users.tasks,
        {
            onDelete: 'CASCADE',
            eager: false
        }
    )
    @JoinColumn()
    user: UsersEntity;
}