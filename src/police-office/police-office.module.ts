import { Module } from '@nestjs/common';
import { PoliceOfficeService } from './police-office.service';
import { PoliceOfficeController } from './police-office.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliceOffice } from './entities/police-office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PoliceOffice])],
  controllers: [PoliceOfficeController],
  providers: [PoliceOfficeService]
})
export class PoliceOfficeModule {}
