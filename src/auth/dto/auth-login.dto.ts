import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'email'})
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'password'})
  password: string;
}