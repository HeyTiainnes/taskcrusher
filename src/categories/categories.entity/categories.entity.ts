import { TasksEntity } from "src/tasks/tasks.entity/tasks.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne } from "typeorm";



@Entity('Categories')

export class CategoriesEntity {
    @PrimaryGeneratedColumn()
    id_categorie: number

    @Column()
    name: string;

    @Column()
    couleur: string;


}
