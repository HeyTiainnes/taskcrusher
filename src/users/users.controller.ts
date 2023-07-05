// import { Controller, Get, Post, Delete, Patch, Body, Param } from '@nestjs/common';
import { getUser } from './Dto/getUser.dto';
import { UsersService } from './users.service';
import { UsersEntity } from './Dto/users.entity/users.entity';
import { createUser } from './Dto/createUser.dto';
import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';


@Controller('theyUsers')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post()
    async createUser(@Body() createUserDto: createUser) {
        console.log('new user', createUserDto);
        return await this.userService.createUser(createUserDto);
    }

    @Patch(':id_users')
    async updateUser(@Param('id_users') id_users: string, @Body() updateUserDto: getUser) {
        console.log('update', updateUserDto, 'id_users', +id_users);
        return await this.userService.updateUser(+id_users, updateUserDto);
    }

    @Delete()
    deleteTodo(): string {
        console.log('suppr user');
        return 'suppr user';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

}
