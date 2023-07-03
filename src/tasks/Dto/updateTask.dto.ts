import { CheckListItemsEntity } from "src/check-list-items/check-list-items.entity/check-list-items.entity";

export class updateTaskeDto {
    // id: number;
    designation: string;
    importance: number;
    dead_line: Date;
    duree_prevue: Date;
    date_debut_prevue: Date;
    etat: boolean;
    notes: string;
    checkListItems: CheckListItemsEntity[];
}