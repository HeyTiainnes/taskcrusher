import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('categories')

export class CategoriesEntity {
    @PrimaryGeneratedColumn('uuid')
    id_categorie: number

    @Column()
    name: string;

    @Column()
    couleur: string;

    //

}
