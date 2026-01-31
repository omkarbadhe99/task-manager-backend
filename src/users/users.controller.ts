import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './DTO/CreateUserDto.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}
    @Get('getUsers')
    getUsers(){
        return this.userService.findUsers();
    }

    @Post('createUser')
    createUsers(@Body() createUserDto:CreateUserDto){
         console.log(createUserDto)
       return this.userService.createUser(createUserDto);
    }
}
