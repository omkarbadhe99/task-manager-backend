import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { registerDto } from './DTO/register.dt';
import { loginDto } from './DTO/login.dto';
import bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, private readonly jwtService: JwtService) { }

    async register(registerDto: registerDto) {
        const existingUser = await this.userRepo.findOne({ where: { email: registerDto.email } });

        if (existingUser) {
            throw new HttpException(
                { success: false, message: 'Email already exists' },
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashPassword = await bcrypt.hash(registerDto.password, 10)
        registerDto.password = hashPassword;
        return this.userRepo.save(registerDto)

    }

    async login(loginDto: loginDto) {
        const { email, password } = loginDto;
        const existUser = await this.userRepo.findOne({
            where: { email }
        })
        console.log(existUser);
        

        if (!existUser) {
            throw new HttpException(
                { success: false, message: 'Email Not Found' },
                HttpStatus.BAD_REQUEST,
            );
        }
        const isMatch = await bcrypt.compare(password, existUser.password)
        if (!isMatch) {
            throw new HttpException({
                success: false, message: 'Incorrect Password'
            }, HttpStatus.BAD_REQUEST,
            );
        }
        const payload = { userId: existUser.id, email: existUser.email,name:existUser.name };
        const token = await this.jwtService.signAsync(payload);
        return {
            success: true,
            message: 'Login Successful',
            
            data: {
                id: existUser.id,
                name: existUser.name,
                email: existUser.email,
                acces_tocken: token,
            },
        };
    }
    async getUsers(page: number = 1, limit: number = 10) {
        const [users, total] = await this.userRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order:{id:'DESC'}
        });

        return {
            success: true,
            data: users,
            meta: {
                totalItems: total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    logout(){
        
    }
}
