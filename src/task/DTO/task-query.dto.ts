import { IsOptional, IsEnum,IsPositive } from "class-validator";
import { taskStaus } from "src/task/DTO/taskenum";
import { PaginationDto } from 'src/common/pagination/dto/pagination-query.dto';
import { IntersectionType } from "@nestjs/mapped-types"; 
import { Type } from "class-transformer"
class TaskBaseDto {
    @IsOptional()
    @IsEnum(taskStaus)
    status?: taskStaus

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    categoryId: number
}

export class GetTaskQueryDto extends IntersectionType(
  TaskBaseDto,
  PaginationDto
) {}