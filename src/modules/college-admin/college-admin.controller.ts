import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CollegeAdminService } from './college-admin.service';
import { CreateCollegeAdminDto } from './dto/create-college-admin.dto';
import { UpdateCollegeAdminDto } from './dto/update-college-admin.dto';

@Controller('college-admin')
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollegeAdminDto: UpdateCollegeAdminDto,
  ) {
    return this.collegeAdminService.update(+id, updateCollegeAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collegeAdminService.remove(+id);
  }
}
