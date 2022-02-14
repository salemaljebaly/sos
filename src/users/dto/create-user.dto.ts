import { IsBoolean, IsEmail, IsNotEmpty, Min, MinLength } from "class-validator";

export class CreateUserDto {
    
    @MinLength(3)
    @IsNotEmpty()
    firstName: string;
  
    @MinLength(3)
    @IsNotEmpty()
    lastName: string;
  
    @IsNotEmpty()
    username: string;

    
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    isActive: boolean;
}
