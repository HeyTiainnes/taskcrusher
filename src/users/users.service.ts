import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './Dto/users.entity/users.entity';
import { getUser } from './Dto/getUser.dto'
import { createUser } from './Dto/createUser.dto';



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
    ) { }

    async createUser(user: UsersEntity) {
        return await this.userRepository.save(user);
    }


    async findOne(userId: number): Promise<UsersEntity> {
        const userFound = await this.userRepository.findOneBy({
            userId: userId,
        });
        if (!userFound) {
            throw new NotFoundException(
                `Désolé, nous n'avons pas trouvé de user avec l'id ${userId}`,
            );
        }
        return userFound;
    }
    // async findAll(): Promise<UsersEntity[]> {
    //     return await this.userRepository.find();
    // }

    async update(userId: number, updateUserDto: createUser) {
        const userUpdate = await this.findOne(userId);
        userUpdate.name = updateUserDto.name;
        userUpdate.mail = updateUserDto.mail;
        userUpdate.password = updateUserDto.password;


        return await this.userRepository.save(userUpdate);
    }
    async findAll(): Promise<UsersEntity[]> {
        return await this.userRepository.find();
    }
    async remove(userId: number): Promise<string> {
        const Result = await this.userRepository.delete({ userId });
        if (Result.affected === 0) {
            throw new NotFoundException(
                `Suppression impossible, car il n'y a pas de tasl avec l'id ${userId}`,
            );
        }
        return `Bravo: L'utilisateur avec l'id ${userId} a bien été supprimée...`;
    }

}















