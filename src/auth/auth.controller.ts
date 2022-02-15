import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AR } from 'src/locale/ar';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt.auth.gaurd';

@ApiTags("Authorization")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post()
  @ApiCreatedResponse({description: AR.user_login})
  @ApiUnauthorizedResponse({description: AR.wrong_email_or_password})
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Success!';
  }
}