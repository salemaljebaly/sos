import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { About } from './entities/about.entity';

@Injectable()
export class AboutService {
  // ----------------------------------------------------------------------------------- //
  constructor(
    @InjectRepository(About)
    private aboutRepository: Repository<About>,
  ) {}
  // ----------------------------------------------------------------------------------- //

  async create(createAboutDto: CreateAboutDto, user : User) {
    createAboutDto.user = user;
    console.log(user)
    return await this.aboutRepository.create(createAboutDto).save();
  }
  // ----------------------------------------------------------------------------------- //

  findAll() {
    return this.aboutRepository.find();
  }
  // ----------------------------------------------------------------------------------- //

  findOne(id: number) {
    return this.aboutRepository.findOne(id);
  }
  // ----------------------------------------------------------------------------------- //

  update(id: number, updateAboutDto: UpdateAboutDto) {
    return this.aboutRepository.update(id, updateAboutDto);
  }
  // ----------------------------------------------------------------------------------- //

  remove(id: number) {
    this.aboutRepository.delete(id);
    return id;
  }
  // ----------------------------------------------------------------------------------- //
}
