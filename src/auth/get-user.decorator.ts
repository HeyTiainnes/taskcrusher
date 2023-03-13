import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersEntity } from 'src/users/Dto/users.entity/users.entity';

export const GetUser = createParamDecorator(
    (_data, ctx: ExecutionContext): UsersEntity => {
        const req = ctx.switchToHttp().getRequest();
        return req.user;
    },
);