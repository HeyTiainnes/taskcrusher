import { CategoriesEntity } from "src/categories/categories.entity/categories.entity";
import { checkListItemsEntity, } from "src/check-list-items/check-list-items.entity/check-list-items.entity";
import { UsersEntity } from "src/users/users/users.entity/users.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('Tasks')

export class TasksEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    designation?: string;

    @Column({ nullable: true })
    importance?: number;

    @Column({ nullable: true })
    dead_line?: Date;

    @Column({ nullable: true })
    duree_prevue?: Date;

    @Column({ nullable: true })
    date_debut_prevue?: Date;

    @Column({ nullable: true })
    etat?: boolean;

    @Column({ nullable: true })
    notes?: string;

    @OneToMany(type => checkListItemsEntity, (checkListItems) => checkListItems.Tasks)
    checkListItems: checkListItemsEntity[];

    @OneToOne(type => CategoriesEntity, (categorie) => categorie.Tasks)
    categories: CategoriesEntity[];

    @OneToOne(type => UsersEntity, (users) => users.Tasks)
    user: UsersEntity;

}
//