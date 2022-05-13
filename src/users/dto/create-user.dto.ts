import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/auth/enum/role.enum';
import { AR } from 'src/locale/ar';

export class CreateUserDto {
  // ----------------------------------------------------------------------------------- //
  @IsString({message: AR.IsString})
  @MinLength(3)
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({ type: String, description: 'firstname' })
  firstName: string;
  // ----------------------------------------------------------------------------------- //
  @IsString({message: AR.IsString})
  @MinLength(3)
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({ type: String, description: 'lastname' })
  lastName: string;
  // ----------------------------------------------------------------------------------- //
  @IsString({message: AR.IsString})
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({ type: String, description: 'username' })
  username: string;
  // ----------------------------------------------------------------------------------- //
  @IsEmail()
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({ type: String, description: 'email' })
  email: string;
  // ----------------------------------------------------------------------------------- //
  @IsString({message: AR.IsString})
  @MinLength(6)
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({ type: String, description: 'password' })
  password: string;
  // ----------------------------------------------------------------------------------- //
  @IsBoolean({message: AR.IsBoolean})
  @ApiProperty({ type: Boolean, description: 'isActive' })
  isActive: boolean;
  // ----------------------------------------------------------------------------------- //
  @IsString({message: AR.IsString})
  @IsEnum(Role)
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({type: String, enum: Role, default : Role.User})
  role: Role;
  // ----------------------------------------------------------------------------------- //


}
