import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/typeorm/entities/task.entity';
import { DataSource, Repository } from 'typeorm';
import { taskDto } from './DTO/task.dto';
import { PaginationDto } from 'src/common/pagination/dto/pagination-query.dto';
import { GetTaskQueryDto } from './DTO/task-query.dto';
import { stat } from 'fs';
@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepo: Repository<Task>,
        private readonly dataSourse: DataSource
    ) { }

    async createTask(taskDto: taskDto, userId: number) {
        const taskData = { ...taskDto, userId }
        console.log(taskData);
        const savedTask = await this.taskRepo.save(taskData);
        const responseData = {
            id: savedTask.id,
            title: savedTask.title,
            description: savedTask.description,
            status: savedTask.status,
            categoryId: savedTask.categoryId,
            file_name: savedTask.files,
            created_at: savedTask.created_at,
            updated_at: savedTask.updated_at,
        };
        return {
            message: "Task Created Sucessfully",
            data: responseData,
        }
    }

    async updateTask(user_id: number, task_id: number, taskDto:taskDto) {
        const task = await this.taskRepo.findOne({
            where: {
                id: task_id,
                userId: user_id,
            },
        });
        if (!task) {
            throw new NotFoundException('Task not found ');
        }
        Object.assign(task, taskDto);
        const updateTask = await this.taskRepo.save(task);
        return {
            message: "Task Updated",
            data: updateTask,
        }
    }


    async getTask(user_id: number, getTaskQueryDto: GetTaskQueryDto) {
        const { page = 1, limit = 10, status, categoryId } = getTaskQueryDto;
        const skip = (page - 1) * limit;

        // 1️⃣ Count total tasks
        const countQuery = this.dataSourse
            .getRepository(Task)
            .createQueryBuilder('task')
            .where("task.userId = :user_id", { user_id })
            .andWhere("task.deleted_by IS NULL");

        if (status) countQuery.andWhere("task.status = :status", { status });
        if (categoryId) countQuery.andWhere("task.categoryId = :categoryId", { categoryId });

        const total = await countQuery.getCount();

        // 2️⃣ Get paginated tasks
        // const taskList = await this.dataSourse
        //     .getRepository(Task)
        //     .createQueryBuilder('task')
        //     .leftJoin("task.category", "category")
        //     .where("task.userId = :user_id", { user_id })
        //     .andWhere("task.deleted_by IS NULL")
        //     .orderBy("task.created_at", "DESC")
        //     .offset(skip)
        //     .limit(limit)
        //     .select([
        //         "task.id AS task_id",
        //         "task.title AS task_title",
        //         "task.status AS task_status",
        //         "task.created_at AS created_at",
        //         "category.id AS category_id",
        //         "category.name AS category_name"
        //     ])
        //     .getRawMany();

        const taskList = await this.dataSourse
            .getRepository(Task)
            .createQueryBuilder('task')
            .leftJoin("task.category", "category")
            .where("task.userId = :user_id", { user_id })
            .andWhere("task.deleted_by IS NULL")
            .orderBy("task.created_at", "DESC")
            .offset(skip)
            .limit(limit)
            .select([
                "task.id AS task_id",
                "task.title AS task_title",
                "task.status AS task_status",
                "task.created_at AS created_at",
                "category.id AS category_id",
                "category.name AS category_name"
            ]);

        if (status) {
            taskList.andWhere('task.status = :status', { status });
        }

        if (categoryId) {
            taskList.andWhere("task.categoryId = :categoryId", { categoryId });
        }
        console.log("d", taskList.getQuery());
        const rows = await taskList.getRawMany();

        // 3️⃣ Flatten response (no nested 'data')
        return {
            success: true,
            message: "Task List Fetched",
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: rows.map(row => ({
                id: row.task_id,
                title: row.task_title,
                status: row.task_status,
                category: {
                    id: row.category_id,
                    name: row.category_name,
                },
                created_at: row.created_at,
            })),
        };
    }
    async getTaskById(id:number,user_id : number){
        const task = await this.taskRepo.findOne({
            where :  {id:id,userId:user_id},
            select:['id','title','description','status','categoryId','files']
        })
        if(task){
            return { message: "Task List Fetched",
                data:task
            }
        }
        
    }

}
