import { IsNotEmpty, IsString,IsEmail } from "class-validator";

export class registerDto {
   @IsString()
   @IsNotEmpty()
   name:string

   @IsNotEmpty()
   @IsNotEmpty()
   @IsEmail({}, { message: 'Invalid email format' })
   email:string

   @IsNotEmpty()
   @IsNotEmpty()
   password:string

}

