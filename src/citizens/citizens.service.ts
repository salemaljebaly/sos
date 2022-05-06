import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitizenLoginDto } from './dto/citizen-login.dto';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { Citizen } from './entities/citizen.entity';

@Injectable()
export class CitizensService {
  // ----------------------------------------------------------------------------------- //
  constructor(
    @InjectRepository(Citizen)
    private citizenRepository: Repository<Citizen>,
    private jwtService: JwtService,
  ) {}
  // ----------------------------------------------------------------------------------- //
  //TODO fix duplicate citizen
  async create(createCitizenDto: CreateCitizenDto) {
    const citizen = this.citizenRepository.create(createCitizenDto);
    if(await this.findByUserName(createCitizenDto.username) == undefined){
      await citizen.save();
    }
    // use delete to hide password from response
    delete citizen.password;
    return citizen;
  }
  // ----------------------------------------------------------------------------------- //
  async findAll(): Promise<Citizen[]> {
    const citizen = await this.citizenRepository.find();
    // remove password from response
    citizen.map((user) => {
      delete user.password;
    });
    return citizen;
  }
  // ----------------------------------------------------------------------------------- //
  async findOne(id: number) {
    const citizen = await this.citizenRepository.findOne(id);
    if (citizen?.password) {
      // use delete to hide password fro m response
      delete citizen.password;
    }

    return citizen;
  }
  // ----------------------------------------------------------------------------------- //
  async update(id: number, updateCitizenDto: UpdateCitizenDto) {
    return await this.citizenRepository.update(id, updateCitizenDto);
  }
  // ----------------------------------------------------------------------------------- //
  async remove(id: number) {
    await this.citizenRepository.delete(id);
    return id;
  }
  // ----------------------------------------------------------------------------------- //
  async findByUserName(username: string) {
    return await this.citizenRepository.findOne({
      where: {
        username: username,
      },
    });
  }
  // ----------------------------------------------------------------------------------- //
  async login(citizenLoginDto: CitizenLoginDto) {
    
    const citizen = await this.validateUser(citizenLoginDto);

    // properties  that want to save in jwt
    const payload = {
      id: citizen.id,
      firstName: citizen.firstName,
      lastName: citizen.lastName,
      username: citizen.username,
      email: citizen.email,
      phone: citizen.phone,
      isActive: citizen.isActive,
      city: citizen.city      
    };

    return {
      access_token: this.jwtService.sign(payload)
    };
    
  }
  // ----------------------------------------------------------------------------------- //
  // check if user is exist then check compare password to check if user data is correct
  async validateUser(citizenLoginDto: CitizenLoginDto): Promise<Citizen> {
    const { username, password } = citizenLoginDto;

    const citizen = await this.findByUserName(username);
    if (!(await citizen?.validatePassword(password))) {
      throw new UnauthorizedException();
    }
    
    return citizen;
  }
  // ----------------------------------------------------------------------------------- //
  countAllCitizen() {
    return this.citizenRepository.count();
  }

}
