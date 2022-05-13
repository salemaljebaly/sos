import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { CitizensModule } from 'src/citizens/citizens.module';
import { ReportGetWay } from './report.getway';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), CitizensModule],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
