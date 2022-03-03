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
import fs = require('fs');
// ----------------------------------------------------------------------------------- //
export const storage = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      let fileType: string;
      fileType = path.parse(file.originalname).ext.slice(1).trim();
      // check if file type exists in file type
      for (fileType in FileTypes) {
        fileType = path.parse(file.originalname).ext.slice(1);
      }
      // check if the dir name is exists
      if (!fs.existsSync('./uploads/files/' + fileType)) {
        fs.mkdirSync('./uploads/files/' + fileType);
      }
      cb(null, './uploads/files/' + fileType + '/');
    },
    filename: (req, file, cb) => {
      // const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const filename: string =
        new Date().toISOString().slice(0, 10) + '_' + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
// ----------------------------------------------------------------------------------- //
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
  async uploadFile(@UploadedFile() file, @Param('id') reportId) {
    const currentReport = await this.reportService.findOneReport(reportId);
    // delete old file from files
    if (currentReport.reportFilePath != null) {
      fs.unlink(
        `./uploads/files/${currentReport.fileType}/${currentReport.reportFilePath}`,
        function (err) {
          if (err) return console.log(err);
          console.log('file deleted successfully');
        },
      );
    }
    // upload new file
    const extension: string = path.parse(file.originalname).ext.slice(1);
    this.reportService.uploadFile(reportId, extension, file.filename);
    return { imagePath: file.path };
  }
  // ----------------------------------------------------------------------------------- //
  // read images
  @Get('upload/:id/')
  async seeUploadedFile(
    @Param('id') id,
    @Res() res,
  ): Promise<any> {
    const currentReport = await this.reportService.findOneReport(id);
    return res.sendFile(
      join(process.cwd(), `./uploads/files/${currentReport.fileType}/${currentReport.reportFilePath}`),
    );
  }
  // ----------------------------------------------------------------------------------- //
}
