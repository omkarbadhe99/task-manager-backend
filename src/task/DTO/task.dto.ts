import { IsNotEmpty, IsString, IsInt, IsIn, IsEnum } from "class-validator";
import { taskStaus } from "./taskenum";
import { Type } from "class-transformer";

export class taskDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    @IsNotEmpty()
    title: string

    @IsNotEmpty({ message: 'Description is required' })
    @IsString()
    @IsNotEmpty()
    description: string


    @IsNotEmpty({ message: 'Status is required' })
    @IsEnum(taskStaus, { message: 'Status must be either PENDING or DONE' })
    status: taskStaus;

    @IsNotEmpty({ message: 'Category is required' })
    @IsInt()
    @Type(()=> Number)
    categoryId: number;
}