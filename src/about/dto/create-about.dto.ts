import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateAboutDto {
  // ----------------------------------------------------------------------------------- //
  @IsNotEmpty()
  @IsString()
  key: string;
  // ----------------------------------------------------------------------------------- //
  @IsNotEmpty()
  @IsString()
  value: string;
  // ----------------------------------------------------------------------------------- //
  user : User;
}
