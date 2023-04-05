import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/middleware/authenticate.guard';
import { CollegeAdminService } from './admin.service';
import { CreateCollegeAdminDto } from './dto/admin.dto';
@ApiTags('College Admin')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('admin')
export class CollegeAdminController {
  constructor(private readonly collegeAdminService: CollegeAdminService) {}

  @Post()
  create(@Body() createCollegeAdminDto: CreateCollegeAdminDto) {
    return this.collegeAdminService.create(createCollegeAdminDto);
  }

  @Get()
  findAll() {
    return this.collegeAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collegeAdminService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collegeAdminService.remove(+id);
  }
}
