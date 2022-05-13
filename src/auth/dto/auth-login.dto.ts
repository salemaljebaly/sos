import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AR } from 'src/locale/ar';

export class AuthLoginDto {

  @IsString({message: AR.IsString})
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({type: String, description: 'username'})
  username: string;

  @IsString({message: AR.IsString})
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({type: String, description: 'password'})
  password: string;
}