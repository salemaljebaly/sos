import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CitizensService } from './citizens.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { Response } from 'express';
import { AR } from 'src/locale/ar';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';

@ApiTags('Citizens')
@Controller('citizens')
export class CitizensController {
  constructor(private readonly citizensService: CitizensService) {}

  @Post()
  create(@Body() createCitizenDto: CreateCitizenDto) {
    return this.citizensService.create(createCitizenDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.citizensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const citizen = this.citizensService.findOne(id);
    return citizen;
    // if(Object.keys(citizen).length > 0){return citizen} else {return {message : AR.no_citizen_found}}
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitizenDto: UpdateCitizenDto) {
    return this.citizensService.update(+id, updateCitizenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citizensService.remove(+id);
  }
}
