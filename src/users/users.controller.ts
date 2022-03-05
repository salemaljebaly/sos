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
  Res,
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
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/enum/role.enum';
// ----------------------------------------------------------------------------------- //
export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
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
@ApiTags('Users')
@Controller('users')
export class UsersController {
  // ----------------------------------------------------------------------------------- //
  constructor(private readonly usersService: UsersService) {}
  // ----------------------------------------------------------------------------------- //
  @Post()
  @ApiCreatedResponse({ description: AR.user_created })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  // ----------------------------------------------------------------------------------- //
  @Get()
  //TODO fix authorize
  @Roles( Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.usersService.findAll();
  }
  // ----------------------------------------------------------------------------------- //
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.usersService.findOneById(+id);
  }
  // ----------------------------------------------------------------------------------- //
  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string) {
    console.log(keyword);
    return this.usersService.searchByfirstname(keyword);
  }
  // ----------------------------------------------------------------------------------- //
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: AR.user_updated })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  // ----------------------------------------------------------------------------------- //
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: AR.user_deleted })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  // ----------------------------------------------------------------------------------- //
  // upload single file
  @Post('upload')
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
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return { imagePath: file.path };
  }
  // ----------------------------------------------------------------------------------- //
  // upload multiple images
  @Post('uploads')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
        background: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'background', maxCount: 1 },
      ],
      storage,
    ),
  )
  uploadFiles(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    return files;
  }
  // ----------------------------------------------------------------------------------- //
  // read images
  @Get('upload/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res): any {
    return res.sendFile(join(process.cwd(), 'uploads/profileimages/' + image));
  }
  // ----------------------------------------------------------------------------------- //
}
