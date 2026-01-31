import { Injectable, HttpException, NotFoundException, BadRequestException } from '@nestjs/common';
import { categoryDto } from './DTO/category.dto';
import { Category } from 'src/typeorm/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, In } from 'typeorm';
@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private readonly categoryRepo: Repository<Category>) { }
    async createCategory(categoryDto: categoryDto, userId: number) {
        const categoryData = { ...categoryDto, userId }
        console.log(categoryData);

        const category = await this.categoryRepo.save(categoryData)
        return {
            message: 'Category created successfully',
            data: category,
        };
    }
    async updateCategory(categoryId: number, categoryDto: categoryDto, userId: number) {
        if (!categoryId) {
            throw new NotFoundException('Category Not Found')
        }
        const category = await this.categoryRepo.findOne({
            where: { 'id': categoryId, userId: userId }
        })
        if (!category) {
            throw new NotFoundException('Category not found or not accessible');
        }
        Object.assign(category, categoryDto);  // Merge changes
        const updatedCategory = await this.categoryRepo.save(category); // UPDATE, not INSERT
        return {
            message: 'Category Updated successfully',
            data: updatedCategory,
        };
    }

    async getSingleCategory(categoryId: number, userId: number) {
        const category = await this.categoryRepo.findOne({
            where: { 'id': categoryId, userId: userId }
        })
        if (!category) {
            throw new NotFoundException('Category not found or not accessible');
        }
        return {
            message: 'Category fetched successfully',
            data: category,
        };
    }

    async getAllCategory(userId: number) {
        console.log(userId);

        const categoryList = await this.categoryRepo.find({
            where: { 'userId': userId, 'deleted_by': IsNull() }
        })
        return {
            message: "Category List fetched successfully",
            data: categoryList
        }
    }

    async deleteCategory(categoryId: number, userId: number) {
        const category = await this.categoryRepo.findOne({
            where: { id: categoryId, userId: userId },
        });

        if (!category) {
            throw new NotFoundException("Category not found or not accessible");
        }

        // Set deleted_by (and optionally deleted_at)
        category.deleted_by = userId;


        // Persist changes
        await this.categoryRepo.save(category);

        return {
            message: "Category deleted successfully",

        };
    }

    async bulkCategoryDelete(userId: number, categoryIds: number[]) {

        if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
            throw new BadRequestException("The 'categoryIds' array is required and cannot be empty.");
        }
        const categories = await this.categoryRepo.find({
            where: { userId, id: In(categoryIds) },
        });
        if (categories.length === 0) {
            throw new NotFoundException('No categories found for this user.');
        }
        await this.categoryRepo.update(
            { userId: userId, id: In(categoryIds) },
            {
                deleted_by: userId,

            },
        );
       return {
      success: true,
      message: `Total ${categories.length} categories deleted successfully.`,
    };
    }

}

