import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users/users.entity/users.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
    ) { }

    async createUser(user: UsersEntity) {
        return await this.userRepository.save(user);
    }


    async findOne(id_users: number): Promise<UsersEntity> {
        const userFound = await this.userRepository.findOneBy({
            id_users: id_users,
        });
        if (!userFound) {
            throw new NotFoundException(
                `Désolé, nous n'avons pas trouvé de user avec l'id ${id_users}`,
            );
        }
        return userFound;


    }















}