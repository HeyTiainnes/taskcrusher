import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('checkListItems')

export class checkListItems {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    name: string;

    @Column()
    items: string;

    @Column()
    notes: string;

    //

}


//

