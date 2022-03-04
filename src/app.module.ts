import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { CitizensModule } from './citizens/citizens.module';
import { ReportModule } from './report/report.module';
import { PoliceOfficeModule } from './police-office/police-office.module';
import { AboutModule } from './about/about.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UsersModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    CitizensModule,
    ReportModule,
    PoliceOfficeModule,
    AboutModule],
  controllers: [AppController],
  providers: [AppService,JwtStrategy ],
})
export class AppModule {}
