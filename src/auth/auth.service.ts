import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
      ) {}
    
      
      // ------------------------------------------------------------------ //
      async login(authLoginDto: AuthLoginDto) {
        const user = await this.validateUser(authLoginDto);
    
        const payload = {
          userId: user.id,
          username : user.username,
          firstname:user.firstName,
          lastname:user.lastName
        };
    
        return {
          access_token: this.jwtService.sign(payload)
        };
      }
    
      // ------------------------------------------------------------------ //
      async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
        const { username, password } = authLoginDto;
    
        const user = await this.usersService.findByUserName(username);
        if (!(await user?.validatePassword(password))) {
          throw new UnauthorizedException();
        }
    
        return user;
      }
      // ------------------------------------------------------------------ //

}
