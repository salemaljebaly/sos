import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsLatitude, IsLongitude, isLongitude, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { AR } from "src/locale/ar";
import { Long } from "typeorm";

export class CreateCitizenDto {
    
    @IsString({message: AR.IsString})
    @MinLength(3)
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, description: 'firstname'})
    firstName: string;
  
    @IsString({message: AR.IsString})
    @MinLength(3)
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, description: 'lastname'})
    lastName: string;
  
    @IsString({message: AR.IsString})
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, description: 'username'})
    username: string;

    
    @IsEmail()
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, description: 'email'})
    email: string;

    
    @IsPhoneNumber()
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, description: 'phone'})
    phone: string;

    
    @IsString({message: AR.IsString})
    @MinLength(6)
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, description: 'password'})
    password: string;

    
    @IsBoolean({message: AR.IsBoolean})
    @ApiProperty({type: Boolean, description: 'isActive'})
    isActive: boolean;

    @IsString({message: AR.IsString})
    @ApiProperty({type: String, description: 'city'})
    city : string

    @IsLongitude()
    @ApiProperty({type: String, description: 'longitude'})
    longitude: string

    @IsLatitude()
    @ApiProperty({type: String, description: 'latitude'})
    latitude: string
}
