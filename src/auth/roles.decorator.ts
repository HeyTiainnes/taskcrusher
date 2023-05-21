import { SetMetadata } from '@nestjs/common';
import { RoleEnumType } from 'src/users/Dto/users.entity/users.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnumType[]) =>
    SetMetadata(ROLES_KEY, roles);