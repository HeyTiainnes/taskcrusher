import { Controller, Get, Post, Delete, Put, Patch, Body, Param } from '@nestjs/common';
import { getUser } from './Dto/getUser.dto';
import { UserService } from './users.service';
import { UsersEntity } from './Dto/users.entity/users.entity';
import { createUser } from './Dto/createUser.dto';


@Controller('theyUsers')
export class UsersController {

    constructor(private readonly UserService: UserService) { }
    // @Get()
    // getHello(): string {
    //     console.log('recuperer la liste des todo');
    //     return 'liste todo';
    // }
    @Post()
    async createUser(@Body() create: UsersEntity) {
        console.log('new user', create);
        return await this.UserService.createUser(create);
    }

    @Patch(':id_users')
    UpdateUser(@Param('id_users') id_users: string, @Body() updateUserDto: getUser) {
        console.log('update', updateUserDto, 'id_users', +id_users)
        return this.UserService.update(+id_users, updateUserDto);
    }
    @Delete()
    deleteTodo(): string {
        console.log('suppr user');
        return 'suppr user';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.UserService.findOne(+id);
    }

    @Get()
    findAll() {
        return this.UserService.findAll();
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.UserService.remove(+id);
    }

}
