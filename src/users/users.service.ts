import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository,IsNull  } from 'typeorm';
import { CreateUserDto } from './DTO/CreateUserDto.dto';

@Injectable()
export class UsersService {
constructor(@InjectRepository(User) private userRepository:Repository<User>){}
    findUsers(){
        return this.userRepository.find({
            where:{deleted_by :IsNull()}
        });
    }
    
    createUser(createDto:CreateUserDto){
        const newUser = this.userRepository.create({...createDto,created_at:new Date})
        console.log(newUser);
      const createedUser =   this.userRepository.save(newUser)
        return createedUser;
    }
}
