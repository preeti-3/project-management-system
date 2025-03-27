import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    createUser(@Body() body: CreateUserDto) {
        return this.usersService.createUser(body);
    }

    @Get()
    findAllUser() {
        return this.usersService.findAllUser();
    }

    @Get(':id')
    findUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUserById(id);
    }
}
