import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePoliceOfficeDto } from './dto/create-police-office.dto';
import { UpdatePoliceOfficeDto } from './dto/update-police-office.dto';
import { PoliceOffice } from './entities/police-office.entity';

@Injectable()
export class PoliceOfficeService {
  // ----------------------------------------------------------------------------------- //
  constructor(
    @InjectRepository(PoliceOffice)
    private policeOfficeRepository: Repository<PoliceOffice>,
  ) {}
  // ----------------------------------------------------------------------------------- //
  create(createPoliceOfficeDto: CreatePoliceOfficeDto) {
    const police_office = this.policeOfficeRepository.create(
      createPoliceOfficeDto,
    );
    return police_office.save();
  }
  // ----------------------------------------------------------------------------------- //
  // get all police offices
  findAll() {
    return this.policeOfficeRepository.find();
  }
  // ----------------------------------------------------------------------------------- //
  // get report by user id
  findOne(id: number) {
    return this.policeOfficeRepository.findOne(id);
  }
  // ----------------------------------------------------------------------------------- //
  // update office
  update(id: number, updatePoliceOfficeDto: UpdatePoliceOfficeDto) {
    return this.policeOfficeRepository.update(id, updatePoliceOfficeDto);
  }
  // ----------------------------------------------------------------------------------- //
  // remove office
  remove(id: number) {
    return this.policeOfficeRepository.delete(id);
  }
  // ----------------------------------------------------------------------------------- //
}
