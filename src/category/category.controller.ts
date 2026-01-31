import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards,UsePipes, ValidationPipe  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { categoryDto } from './DTO/category.dto';
import { CategoryService } from './category.service';
@Controller('category')
@UseGuards(AuthGuard('jwt'))
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class CategoryController {
    constructor(private readonly categoryService : CategoryService){}
    @Post('createCategory')
    createCategory(@Req() req:any, @Body() categoryDto : categoryDto){
        return this.categoryService.createCategory(categoryDto,req.user.userId)
    }
    @Patch('updateCategory/:id')
    updateCategory(@Param('id') id :number,@Body() categoryDto : categoryDto,@Req() req: any){
        console.log("cateofry ud",id);
        
        return this.categoryService.updateCategory(id,categoryDto,req.user.userId) 
    }
    @Get('getCategory/:id')
    getSingleCategory(@Param('id') id :number,@Req() req: any){
        return this.categoryService.getSingleCategory(id,req.user.userId)
    }

    @Get('getAllCategory')
    getAllCategory(@Req() req : any){
        return this.categoryService.getAllCategory(req.user.userId)
    }

    @Delete('deleteCategory/:id')
    deleteCategory(@Param('id') id: number, @Req() req:any){
        return this.categoryService.deleteCategory(id,req.user.userId)
    }
    @Post('validate_token')
     validateToken (@Req() req:any){
        // console.log("user" + req.user.name);
        
        return req.user ;
     }
     @Delete('bulkCategoryDelete')
     bulkCategoryDelete(@Req() req:any,@Body() body :{categoryIds:number[]}){
        console.log(body.categoryIds);
       
        // return;
        return this.categoryService.bulkCategoryDelete(req.user.userId,body.categoryIds)
     }
}
