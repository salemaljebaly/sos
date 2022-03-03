import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { CitizensModule } from 'src/citizens/citizens.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), CitizensModule],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
