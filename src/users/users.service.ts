import {
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
// ----------------------------------------------------------------------------------- //
@Injectable()
export class UsersService {
  // ----------------------------------------------------------------------------------- //
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // ----------------------------------------------------------------------------------- //
  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    if ((await this.findByUserName(createUserDto.username)) == undefined) {
      await user.save();
    }
    // use delete to hide password from response
    delete user.password;
    return user;
  }
  // ----------------------------------------------------------------------------------- //
  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    // remove password from response
    users.map((user) => {
      delete user.password;
    });
    return users;
  }
  // ----------------------------------------------------------------------------------- //
  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    // use delete to hide password from response
    delete user.password;
    return user;
  }
  // ----------------------------------------------------------------------------------- //
  //TODO user the funtion when I needed, when I add email to project
  // async findByEmail(email: string) {
  //   return await this.usersRepository.findOne({
  //     where: {
  //       email: email,
  //     },
  //   });
  // }
  // ----------------------------------------------------------------------------------- //
  async findByUserName(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }
  // ----------------------------------------------------------------------------------- //
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }
  // ----------------------------------------------------------------------------------- //
  async remove(id: number){
    await this.usersRepository.delete(id);
    return id;
  }
  // ----------------------------------------------------------------------------------- //
  /**
   * Use this function to search in api
   * @param search which key word used to search
   *
   */
  async searchByfirstname(search: string) {
    if (search) {
      const users = await this.usersRepository.find({
        firstName: Like(`%${search}%`),
      });
      users.map((user) => {
        delete user.password;
      });
      if (users.length > 0) {
        return users;
      } else {
        return { msg: 'there is no result' };
      }
    } else {
      return this.findAll();
    }
  }
  // ----------------------------------------------------------------------------------- //
  async queryBuilder(alias: string) {
    return this.usersRepository.createQueryBuilder(alias);
  }
  // ----------------------------------------------------------------------------------- //
  countAllReports(){
    return this.usersRepository.count();
  }
  // ----------------------------------------------------------------------------------- //
}
