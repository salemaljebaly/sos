import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { Citizen } from './entities/citizen.entity';

@Injectable()
export class CitizensService {
  constructor(
    @InjectRepository(Citizen)
    private citizenRepository : Repository<Citizen>
  ){}
  async create(createCitizenDto: CreateCitizenDto) {
    const citizen = this.citizenRepository.create(createCitizenDto);
    await citizen.save();
    
    // use delete to hide password from response
    delete citizen.password;
    return citizen;
  }

  findAll() {
    return `This action returns all citizens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} citizen`;
  }

  update(id: number, updateCitizenDto: UpdateCitizenDto) {
    return `This action updates a #${id} citizen`;
  }

  remove(id: number) {
    return `This action removes a #${id} citizen`;
  }
}
