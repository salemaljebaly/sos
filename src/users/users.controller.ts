import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';
import { AR } from 'src/locale/ar';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // ---------------------------------------------------------------- //
  @Post()
  @ApiCreatedResponse({ description: AR.user_created })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  // ---------------------------------------------------------------- //
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.usersService.findAll();
  }
  // ---------------------------------------------------------------- //
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.usersService.findOneById(+id);
  }
  // ---------------------------------------------------------------- //
  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string) {
    console.log(keyword);
    return this.usersService.searchByfirstname(keyword);
  }
  // ---------------------------------------------------------------- //
  @Patch(':id')
  @ApiCreatedResponse({ description: AR.user_updated })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  // ---------------------------------------------------------------- //
  @Delete(':id')
  @ApiCreatedResponse({ description: AR.user_deleted })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  // ---------------------------------------------------------------- //
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Array<Express.Multer.File>) {
    return file;
  }
  // ---------------------------------------------------------------- //
  @Post('uploads')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ]))
  uploadFiles(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
    return files;
  }
}
