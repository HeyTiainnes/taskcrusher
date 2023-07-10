

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './Dto/users.entity/users.entity';
import { createUser } from './Dto/createUser.dto';
import { getUser } from './Dto/getUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
    ) { }

    async createUser(createUserDto: createUser): Promise<UsersEntity> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    async updateUser(id: number, updateUserDto: getUser): Promise<UsersEntity> {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error(`User with ID ${id} not found.`);
        }
        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }

    async findOne(id: number): Promise<UsersEntity> {
        return this.usersRepository.findOne({ where: { id_users: id } });
    }

    async findAll(): Promise<UsersEntity[]> {
        return this.usersRepository.find();
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}


