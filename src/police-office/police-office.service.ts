import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AR } from 'src/locale/ar';
import { Like, Repository } from 'typeorm';
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
  /**
   * Use this function to search in api
   * @param search which key word used to search
   *
   */
  async searchByPoliceName(office_name: string, office_city: string) {
    if (office_name) {
      const police_office = await this.policeOfficeRepository.find({
        office_name: Like(`%${office_name}%`),
        office_city : Like(`%${office_city}%`),
      });
      
      if (police_office.length > 0) {
        return police_office;
      } else {
        return { msg: AR.no_result };
      }
    } else {
      return this.findAll();
    }
  }
  // ----------------------------------------------------------------------------------- //
  countAllPoliceOffices() {
    return this.policeOfficeRepository.count();
  }
  // ----------------------------------------------------------------------------------- //
}
