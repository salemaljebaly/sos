import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsLatitude, IsLongitude, isLongitude, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { Long } from "typeorm";

export class CreateCitizenDto {
    
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'firstname'})
    firstName: string;
  
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'lastname'})
    lastName: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'username'})
    username: string;

    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'email'})
    email: string;

    
    @IsPhoneNumber()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'phone'})
    phone: string;

    
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'password'})
    password: string;

    
    @IsBoolean()
    @ApiProperty({type: Boolean, description: 'isActive'})
    isActive: boolean;

    @IsString()
    @ApiProperty({type: String, description: 'city'})
    city : string

    @IsLongitude()
    @ApiProperty({type: String, description: 'longitude'})
    longitude: string

    @IsLatitude()
    @ApiProperty({type: String, description: 'latitude'})
    latitude: string
}
