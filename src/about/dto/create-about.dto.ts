import { IsNotEmpty, IsString } from 'class-validator';
import { AR } from 'src/locale/ar';
import { User } from 'src/users/entities/user.entity';

export class CreateAboutDto {
  // ----------------------------------------------------------------------------------- //
  @IsNotEmpty({message: AR.IsNotEmpty})
  @IsString({message: AR.IsString})
  key: string;
  // ----------------------------------------------------------------------------------- //
  @IsNotEmpty({message: AR.IsNotEmpty})
  @IsString({message: AR.IsString})
  value: string;
  // ----------------------------------------------------------------------------------- //
  user : User;
}
