import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Strategy } from 'passport-jwt';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UsersModule,
    TypeOrmModule.forRoot(),
    AuthModule],
  controllers: [AppController],
  providers: [AppService,JwtStrategy ],
})
export class AppModule {}
