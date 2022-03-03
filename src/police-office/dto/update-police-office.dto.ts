import { PartialType } from '@nestjs/swagger';
import { CreatePoliceOfficeDto } from './create-police-office.dto';

export class UpdatePoliceOfficeDto extends PartialType(CreatePoliceOfficeDto) {}
