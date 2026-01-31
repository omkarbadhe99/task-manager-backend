import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/typeorm/entities/task.entity';
import { TaskController } from './task.controller';

@Module({
  imports : [
    TypeOrmModule.forFeature([Task])
  ],
  controllers:[TaskController],
  providers: [TaskService]
})
export class TaskModule {}
