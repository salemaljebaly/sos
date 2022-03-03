import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PoliceOfficeService } from './police-office.service';
import { CreatePoliceOfficeDto } from './dto/create-police-office.dto';
import { UpdatePoliceOfficeDto } from './dto/update-police-office.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';


@ApiTags('Police Office')
@Controller('police-office')
export class PoliceOfficeController {
  // ----------------------------------------------------------------------------------- //
  constructor(private readonly policeOfficeService: PoliceOfficeService) {}
  // ----------------------------------------------------------------------------------- //
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createPoliceOfficeDto: CreatePoliceOfficeDto) {
    return this.policeOfficeService.create(createPoliceOfficeDto);
  }
  // ----------------------------------------------------------------------------------- //
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.policeOfficeService.findAll();
  }
  // ----------------------------------------------------------------------------------- //
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policeOfficeService.findOne(+id);
  }
  // ----------------------------------------------------------------------------------- //
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePoliceOfficeDto: UpdatePoliceOfficeDto,
  ) {
    return this.policeOfficeService.update(+id, updatePoliceOfficeDto);
  }
  // ----------------------------------------------------------------------------------- //  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.policeOfficeService.remove(+id);
  }
  // ----------------------------------------------------------------------------------- //
}