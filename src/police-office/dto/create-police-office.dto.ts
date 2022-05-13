import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
export class CreatePoliceOfficeDto {
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'office name' })
  office_name: string;
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsNotEmpty()
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
