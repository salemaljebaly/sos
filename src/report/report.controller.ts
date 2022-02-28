import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReportDto: CreateReportDto, @Request() req) {
    // get the current citizen data
    const citizen = req.user;
    return this.reportService.create(citizen, createReportDto);
  }

  //TODO fix route bug
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getByUser( @Request() req) {
    console.log(req.user)
    return this.reportService.findByUser(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    // req.user
    return this.reportService.findAll();
    // return "test"
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportService.remove(+id);
  }

  // --------------------------------------------------- //
  
  
}
