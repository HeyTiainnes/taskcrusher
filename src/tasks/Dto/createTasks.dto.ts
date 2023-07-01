import { CheckListItemsEntity } from "src/check-list-items/check-list-items.entity/check-list-items.entity";
import { UsersEntity } from "src/users/Dto/users.entity/users.entity";


export class CreateTasksDTO {

    designation: string;
    // importance: number;
    dead_line: Date;
    start_date: Date;

    notes: string;
    checkListItems: CheckListItemsEntity[];
    user: UsersEntity;

}