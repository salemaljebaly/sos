import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AR } from 'src/locale/ar';
import { Repository } from 'typeorm';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { Citizen } from './entities/citizen.entity';

@Injectable()
export class CitizensService {
  constructor(
    @InjectRepository(Citizen)
    private citizenRepository: Repository<Citizen>,
  ) {}
  async create(createCitizenDto: CreateCitizenDto) {
    const citizen = this.citizenRepository.create(createCitizenDto);
    await citizen.save();

    // use delete to hide password from response
    delete citizen.password;
    return citizen;
  }

  async findAll(): Promise<Citizen[]> {
    const citizen = await this.citizenRepository.find();
    // remove password from response
    citizen.map((user) => {
      delete user.password;
    });
    return citizen;
  }

  async findOne(id: number){
      const citizen = await this.citizenRepository.findOne(id)
      if(citizen?.password) {
        // use delete to hide password fro m response
        delete citizen.password;
      }
      
      return citizen;
  }

  async update(id: number, updateCitizenDto: UpdateCitizenDto) {
    return await this.citizenRepository.update(id, updateCitizenDto);
  }

  async remove(id: number) {
    return await this.citizenRepository.delete(id);
  }
}
