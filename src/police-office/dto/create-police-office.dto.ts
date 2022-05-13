import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { AR } from 'src/locale/ar';
import { User } from 'src/users/entities/user.entity';
export class CreatePoliceOfficeDto {
  // ----------------------------------------------------------------------------------- //
  @IsString({message: AR.IsString})
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({ type: String, description: 'office name' })
  office_name: string;
  // ----------------------------------------------------------------------------------- //
  @IsString({message: AR.IsString})
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({ type: String, description: 'office city' })
  office_city: string;
  // ----------------------------------------------------------------------------------- //
  @IsLongitude()
  @ApiProperty({ type: String, description: 'longitude' })
  longitude: string;
  // ----------------------------------------------------------------------------------- //
  @IsLatitude()
  @ApiProperty({ type: String, description: 'latitude' })
  latitude: string;
  // ----------------------------------------------------------------------------------- //
  user : User;
}
