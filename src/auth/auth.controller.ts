import { Body, Query, Controller,Get, Post,Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { registerDto } from './DTO/register.dt';
import { AuthService } from './auth.service';
import { loginDto } from './DTO/login.dto';
@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AuthController {

    constructor(private readonly authservice: AuthService) { }

    @Post('register')
    register(@Body() registerDto: registerDto) {
        return this.authservice.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: loginDto) {
        return this.authservice.login(loginDto)
    }
    @Get('getUsers')
    async getUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 2,
    ) {
        return this.authservice.getUsers(Number(page), Number(limit));
    }

    @Post('logout')
    logout(){
        return { message: 'Logged out successfully' };
        // this.authservice.logout();
    }
    
}
