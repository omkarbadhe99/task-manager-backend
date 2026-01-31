import { IsNotEmpty, IsString, IsEmail } from "class-validator";
export class loginDto {
    @IsNotEmpty()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string

    @IsNotEmpty()
    @IsNotEmpty()
    password: string
}