import { Body, Controller, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe, NotFoundException, ParseIntPipe, UseInterceptors, UploadedFile, BadRequestException, MaxFileSizeValidator, FileTypeValidator, ParseFilePipe, ParseFilePipeBuilder, Get, Query } from '@nestjs/common';
import { taskDto } from './DTO/task.dto';

import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service';
import { createFileInterceptorHelper, createFileValidationPipe } from 'src/common/file-upload.helper';
import { PaginationDto } from 'src/common/pagination/dto/pagination-query.dto';
import { GetTaskQueryDto } from './DTO/task-query.dto';
@Controller('task')
@UseGuards(AuthGuard('jwt'))
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))

export class TaskController {
    constructor(private readonly taskService: TaskService) { }
    @Post('createTask')
    @UseInterceptors(createFileInterceptorHelper('file', 'task_file', 'single'))
    createTask(@Req() req: any, @Body() taskDto: taskDto, @UploadedFile(createFileValidationPipe()) file: Express.Multer.File) {
        const userId = req.user.userId


        const files = file.originalname
        const data = { ...taskDto, files }
        console.log(data);


        return this.taskService.createTask(data, userId);

    }
    @Patch('updateTask/:id')
    @UseInterceptors(createFileInterceptorHelper('file', 'task_file', 'single'))
    updateTask(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body() taskDto: taskDto,@UploadedFile(createFileValidationPipe()) file: Express.Multer.File) {
        const user_id = req.user.userId;
        const task_id = id;

        return this.taskService.updateTask(user_id, task_id, taskDto)
    }
    @Get('getTask/')
    getTask(@Req() req: any,
        @Query() getTaskQueryDto: GetTaskQueryDto
    ) {
        const user_id = req.user.userId;
        console.log(getTaskQueryDto);

        // return this.taskService.getTask(user_id, getTaskQueryDto)
        return this.taskService.getTask(user_id, getTaskQueryDto)
        // console.log(data);
        // return data;

    }

    @Get('getTaskById/:id')
    getTaskById(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
        const user_id = req.user.userId
        console.log("user_id", user_id);
        console.log("id", id);
        return this.taskService.getTaskById(id,user_id);

    }
}
