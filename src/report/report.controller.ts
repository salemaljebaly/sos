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
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileTypes } from './enums/reporttype';

export const storage = {
  storage: diskStorage({
      destination: './uploads/files',
      filename: (req, file, cb) => {
          // const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const filename: string = new Date().toISOString().slice(0, 10) + "_" + uuidv4();
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${filename}${extension}`)
      }
  })

}
@Controller('report')
export class ReportController {
  public static fileType = FileTypes.PNG;
  // ----------------------------------------------------------------------------------- //
  constructor(private readonly reportService: ReportService) {}
  // ----------------------------------------------------------------------------------- //
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReportDto: CreateReportDto, @Request() req) {
    // get the current citizen data
    const citizen = req.user;
    return this.reportService.create(citizen, createReportDto);
  }
  // ----------------------------------------------------------------------------------- //
  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getByUser(@Request() req) {
    return this.reportService.findByUser(req.user.id);
  }
  // ----------------------------------------------------------------------------------- //
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    // req.user
    return this.reportService.findAll();
    // return "test"
  }
  // ----------------------------------------------------------------------------------- //
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }
  // ----------------------------------------------------------------------------------- //
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto);
  }
  // ----------------------------------------------------------------------------------- //
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.reportService.remove(+id);
  }
  // ----------------------------------------------------------------------------------- //
  // upload
  // upload single file
  @Post('upload/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Param('id') reportId) {
    console.log(reportId);
    console.log(file.filename);
    const extension: string = path.parse(file.originalname).ext.slice(1);
    console.log(extension);
    this.reportService.uploadFile(reportId, extension, file.filename)
    return { imagePath: file.path };
  }
  // ----------------------------------------------------------------------------------- //
  // read images
  @Get('upload/:id/:imgpath')
  async seeUploadedFile(@Param('id') id,@Param('imgpath') image, @Res() res): Promise<any> {
    const currentReport = await this.reportService.findOneReport(id);
    
    return res.sendFile(join(process.cwd(), 'uploads/files/' + currentReport.reportFilePath));
  }
  // ----------------------------------------------------------------------------------- //
}

