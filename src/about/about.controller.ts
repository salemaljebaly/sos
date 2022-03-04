import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';

@ApiTags('About')
@Controller('about')
export class AboutController {
  // ----------------------------------------------------------------------------------- //
  constructor(private readonly aboutService: AboutService) {}
  // ----------------------------------------------------------------------------------- //
  @Post()
  create(@Body() createAboutDto: CreateAboutDto) {
    return this.aboutService.create(createAboutDto);
  }
  // ----------------------------------------------------------------------------------- //
  @Get()
  findAll() {
    return this.aboutService.findAll();
  }
  // ----------------------------------------------------------------------------------- //
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutService.findOne(+id);
  }
  // ----------------------------------------------------------------------------------- //
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutDto: UpdateAboutDto) {
    return this.aboutService.update(+id, updateAboutDto);
  }
  // ----------------------------------------------------------------------------------- //
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutService.remove(+id);
  }
  // ----------------------------------------------------------------------------------- //
}
