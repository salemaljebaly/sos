import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Citizen } from 'src/citizens/entities/citizen.entity';
import { User } from 'src/users/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';
import { FileTypes, ReportState } from './enums/reporttype';

@Injectable()
export class ReportService {
  // ----------------------------------------------------------------------------------- //
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    
    // @InjectRepository(User)
    // private userRepository: Repository<User>,
  ) {}
  // ----------------------------------------------------------------------------------- //
  async create(citizen: Citizen, createReportDto: CreateReportDto) {
    createReportDto.reporter = citizen;
    const report = this.reportRepository.create(createReportDto);
    await report.save();

    return report;
  }
  // ----------------------------------------------------------------------------------- //
  // get all reports with current user authorized
  findAll() {
    return this.reportRepository.find({ relations: ['reporter'] });
  }
  // ----------------------------------------------------------------------------------- //
  // get all reports with current user authorized
  reportsByState() {
    return this.reportRepository.find({where: {state : Not(ReportState.DONE)} ,relations: ['reporter'] });
  }
  // ----------------------------------------------------------------------------------- //
  // get report by user id
  findOne(id: number) {
    return this.reportRepository.findOne({ id }, { relations: ['reporter'] });
  }

  findOneReport(id: number){
    return this.reportRepository.findOne(id);
  }
  // ----------------------------------------------------------------------------------- //
  // get all reports by user id
  async findByUser(id: number) {
    const reports = await this.reportRepository.find({
      where: {
        reporter: id,
      },
      relations: ['reporter']
    });
    // delete password from response
    reports.map((report) => {
      delete report.reporter.password
    })
    return reports;
  }
  // ----------------------------------------------------------------------------------- //
  // update report
  async update(id: number, updateReportDto: UpdateReportDto, user : any) {
    if(user.role != null){
      updateReportDto.user = user;
      console.log(updateReportDto);
      return this.reportRepository.update(id,updateReportDto,);
    } else {
      return this.reportRepository.update(id, updateReportDto);
    }
  }
  // ----------------------------------------------------------------------------------- //
  async uploadFile(id: number, filetype: string, reportFilePath : string) {
    const currentReprot  = await this.findOneReport(id)
    currentReprot.fileType = filetype;
    currentReprot.reportFilePath = reportFilePath;
    return this.reportRepository.save(currentReprot)
  }
  // ----------------------------------------------------------------------------------- //
  // remove report by id
  remove(id: number) {
    this.reportRepository.delete(id);
    return id;
  }
  // ----------------------------------------------------------------------------------- //
  countAllReports(){
    return this.reportRepository.count();
  }
  // ----------------------------------------------------------------------------------- //
}
