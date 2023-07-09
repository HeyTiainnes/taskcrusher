
import { CheckListItemsEntity } from "src/check-list-items/check-list-items.entity/check-list-items.entity";
import { IsNotEmpty } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { UsersEntity } from 'src/users/Dto/users.entity/users.entity';

export class CreateTasksDTO {
    @IsNotEmpty()
    designation: string;

    @IsNotEmpty()
    deadline: Date;

    @IsNotEmpty()
    start_date: Date;

    @IsNotEmpty()
    notes: string;

    checkListItems: CheckListItemsEntity[];

    user: DeepPartial<UsersEntity>;
}

