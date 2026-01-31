import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user.entity';
import { Category } from './typeorm/entities/category.entity';
import { Post } from './typeorm/entities/Post.entity';
import { Task } from './typeorm/entities/task.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { CategoryService } from './category/category.service';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';
import { MailModule } from './mail/mail.module';
import { Photo } from './typeorm/entities/Photo.entity';
import { Comments } from './typeorm/entities/Comments.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
   TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Category, Task, Post, Photo, Comments],
      synchronize: false,
    }), UsersModule, AuthModule, CategoryModule, TaskModule, MailModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
