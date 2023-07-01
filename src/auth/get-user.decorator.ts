import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CheckListItemsEntity } from 'src/check-list-items/check-list-items.entity/check-list-items.entity';
import { TasksEntity } from 'src/tasks/tasks.entity/tasks.entity';
import { UsersEntity } from 'src/users/Dto/users.entity/users.entity';

export interface Tasking {
    Tasking?: TasksEntity;
    CLI?: CheckListItemsEntity;
}

export const GetUser = createParamDecorator(
    (_data, ctx: ExecutionContext): UsersEntity => {
        const req = ctx.switchToHttp().getRequest();
        return req.user;
    },

);
export const GetTask = createParamDecorator(
    (_data, ctx: ExecutionContext): TasksEntity => {
        const req = ctx.switchToHttp().getRequest();
        const tsk = req.user;
        return tsk;
    },
);